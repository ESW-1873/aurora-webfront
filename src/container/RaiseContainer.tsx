import retry from 'async-retry'
import router from 'next/router'
import React, { VFC } from 'react'
import { GetPostContents } from 'src/api/client'
import { postClient } from 'src/api/postClient'
import { SEOProps } from 'src/components/SEO'
import { Raise, RaisingFormData } from 'src/compositions/Raise'
import { useContract } from 'src/external/contract/hooks'
import { useLoadingModalStore, useWalletStore } from 'src/stores'

export type RaiseConainerProps = {
  seoProps?: SEOProps
}
export const RaiseConainer: VFC<RaiseConainerProps> = ({ seoProps }) => {
  const { account } = useWalletStore()
  const { raise } = useContract()
  const { open, close } = useLoadingModalStore()
  const publish = async ({ image, ...data }: RaisingFormData) => {
    open({ heading: 'Sending your project data...', subHeading: '' })
    if (!account) {
      return Promise.reject('You must connect wallet.')
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
      subHeading:
        'Redirect to your project page after your transaction confirmed',
    })
    const setPostIdIfExists = async () => {
      const data = await GetPostContents({ donee: account, metadata }).catch(
        () => undefined,
      )
      if (!data?.postContents.length) {
        throw new Error()
      }
      router.push(`/${data.postContents[0].id}`)
    }
    retry(setPostIdIfExists, {
      forever: true,
    })
  }
  return (
    <Raise {...seoProps} publish={(data) => publish(data).finally(close)} />
  )
}
