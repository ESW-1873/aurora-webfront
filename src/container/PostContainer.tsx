import dayjs from 'dayjs'
import React, { VFC } from 'react'
import { SEOProps } from 'src/components/SEO'
import { Post, PostProps } from 'src/compositions/Post'
import { useGetPostContentQuery } from 'src/__generated__/graphql'

export type PostStaticProps = {
  seoProps?: SEOProps
  postStaticProps: Pick<
    PostProps['postProps'],
    'id' | 'keyVisual' | 'title' | 'description' | 'donee'
  >
}
export const PostContainer: VFC<PostStaticProps> = ({
  postStaticProps,
  seoProps,
}) => {
  // TODO fetch from wallet
  const myAddress = '0xa8fffef192a21f9a45b68d49aa0d0753b9b6e79f'
  const { id } = postStaticProps
  const [res] = useGetPostContentQuery({ variables: { id } })
  if (res.error) {
    // TODO
    console.log(res)
  }
  const data = res.data?.postContent
  const totalDonation = data?.donatedSum || '0'
  const donatedAmount =
    data?.donations?.find(({ sender }) => sender === myAddress)?.amount || '0'
  const canceledDonations = data?.cancelled || []
  const refundRequests = data?.refundRequested || []
  const hasClosed = dayjs().isAfter(data?.endTime)
  return (
    <Post
      postProps={{
        ...postStaticProps,
        totalDonation,
        canceledDonations,
        refundRequests,
        hasClosed,
      }}
      donatedAmount={donatedAmount}
      seoProps={seoProps}
    />
  )
}
