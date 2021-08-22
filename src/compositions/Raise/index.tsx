import React, { VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { postClient } from 'src/api/postClient'
import { BlurredBackground } from 'src/components/Background'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { useContract } from 'src/external/contract/hooks'
import { PageWrapper } from '../PageWrapper'
import { RaisingForm, RaisingFormData } from './RasingForm'

export type RaiseProps = {
  seoProps?: SEOProps
}
export const Raise: VFC<RaiseProps> = ({ seoProps }) => {
  const { raise } = useContract()
  const publish = async ({ image, ...data }: RaisingFormData) => {
    const res = await postClient.postPost({
      ...data,
      image: {
        data: image.dataUrl.replace(/data.*base64,/, ''),
        contentType: image.contentType,
      },
    })
    if (!res.data.metadataUrl) throw new Error()
    await raise(res.data.metadataUrl)
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
    </>
  )
}
