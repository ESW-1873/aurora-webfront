import retry from 'async-retry'
import router from 'next/router'
import React, { VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { GetPostContents } from 'src/api/client'
import { postClient } from 'src/api/postClient'
import { BlurredBackground } from 'src/components/Background'
import { LoadingModal } from 'src/components/Modal/LoadingModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { useContract } from 'src/external/contract/hooks'
import { useLoadingModalStore, useWalletStore } from 'src/stores'
import { PageWrapper } from '../PageWrapper'
import { RaisingForm, RaisingFormData } from './RasingForm'

export type RaiseProps = {
  seoProps?: SEOProps
}
export const Raise: VFC<RaiseProps> = ({ seoProps }) => {
  const { account } = useWalletStore()
  const { raise } = useContract()
  const { open, close } = useLoadingModalStore()
  const publish = async ({ image, ...data }: RaisingFormData) => {
    open({ heading: 'Sending your project info...', subHeading: '' })
    if (!account) {
      close()
      throw new Error('You must connect wallet.')
    }
    const res = await postClient.postPost({
      ...data,
      image: {
        data: image.dataUrl.replace(/data.*base64,/, ''),
        contentType: image.contentType,
      },
    })
    const metadata = res.data.metadataUrl
    if (!metadata) {
      throw new Error()
    }
    open({
      heading: 'Waiting for confirmation',
      subHeading: 'Confirm this transaction in your wallet',
    })
    await raise(metadata)
    open({
      heading: 'Waiting for confirmation',
      subHeading: 'Redirect to project page on your transaction confirmed',
    })
    const setPostIdIfExists = async () => {
      const data = await GetPostContents({ donee: account, metadata }).catch(
        () => undefined,
      )
      if (!data?.postContents.length) {
        throw new Error()
      }
      close()
      router.push(`/${data.postContents[0].id}`)
    }
    retry(setPostIdIfExists, {
      forever: true,
    })
  }
  const methods = useForm<RaisingFormData>()
  const { watch } = methods
  const imageUrl = watch('image.dataUrl')
  return (
    <>
      <BlurredBackground imageUrl={imageUrl} />
      <PageWrapper {...seoProps}>
        <main>
          <FormProvider {...methods}>
            <RaisingForm publish={publish} />
          </FormProvider>
        </main>
      </PageWrapper>
      <WalletModal />
      <LoadingModal />
    </>
  )
}
