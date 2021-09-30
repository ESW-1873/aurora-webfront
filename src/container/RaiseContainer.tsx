import AsyncRetry from 'async-retry'
import router from 'next/router'
import React, { VFC } from 'react'
import { GetPostContents } from 'src/api/client'
import { postClient } from 'src/api/postClient'
import { SEOProps } from 'src/components/SEO'
import { Raise, RaisingFormData } from 'src/compositions/Raise'
import { useContract } from 'src/external/contract/hooks'
import {
  useLoadingModalStore,
  usePreviewResponseStore,
  useWalletStore,
} from 'src/stores'

export type RaiseConainerProps = {
  seoProps?: SEOProps
}
export const RaiseConainer: VFC<RaiseConainerProps> = ({ seoProps }) => {
  const { account } = useWalletStore()
  const { raise } = useContract()
  const { open } = useLoadingModalStore()
  const { state: previewResponse } = usePreviewResponseStore()
  const publish = async ({
    image,
    capacity,
    periodSeconds,
    ...data
  }: RaisingFormData) => {
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
    const { metadata } = res.data
    if (!metadata) {
      throw new Error()
    }
    open({
      heading: 'Waiting for confirmation',
      subHeading: 'Confirm this transaction in your wallet',
    })
    await raise(metadata, capacity, periodSeconds)
    open({
      heading: 'Waiting for confirmation',
      subHeading:
        'Redirect to your project page after your transaction confirmed',
    })
    const setSampleFromPreview = async (postId: string) => {
      if (previewResponse) {
        postClient.samplePost({
          postId: postId,
          token: previewResponse.token,
        })
      }
      const res = await postClient.previewPost({
        title: data.title,
        description: data.description,
        image: {
          data: image.dataUrl.replace(/data.*base64,/, ''),
          contentType: image.contentType,
        },
      })
      postClient.samplePost({
        postId: postId,
        token: res.data.token,
      })
    }
    const setPostIdIfExists = async () => {
      const data = await GetPostContents({ donee: account, metadata }).catch(
        () => undefined,
      )
      if (!data?.postContents.length) {
        throw new Error()
      }
      const postId = data.postContents[0].id
      setSampleFromPreview(postId) // PreviewCard作成 & PostId紐付け
      const path = `/${postId}`
      await router.prefetch(path)
      router.push(path)
    }
    AsyncRetry(setPostIdIfExists, {
      forever: true,
    })
  }
  return <Raise {...seoProps} publish={publish} />
}
