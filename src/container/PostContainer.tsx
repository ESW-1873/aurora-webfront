import dayjs from 'dayjs'
import React, { VFC } from 'react'
import { SEOProps } from 'src/components/SEO'
import { Post, PostProps } from 'src/compositions/Post'
import { useWalletStore } from 'src/stores'
import { useGetPostContentQuery } from 'src/__generated__/graphql'

export type PostStaticProps = {
  seoProps?: SEOProps
  postStaticProps: Pick<
    PostProps['postProps'],
    'id' | 'keyVisual' | 'title' | 'description' | 'donee'
  > & {
    endTime: number
  }
}
export const PostContainer: VFC<PostStaticProps> = ({
  postStaticProps,
  seoProps,
}) => {
  const { id } = postStaticProps
  const { account } = useWalletStore()
  const [res] = useGetPostContentQuery({ variables: { id } })
  if (res.error) {
    // TODO
    console.log(res)
  }
  const data = res.data?.postContent
  const totalDonation = data?.donatedSum || '0'
  const ownDonation =
    (account && data?.donations?.find(({ sender }) => sender === account)) ||
    undefined
  const canceledDonations = data?.cancelled || []
  const refundRequests = data?.refundRequested || []
  const endTime = dayjs.unix(data?.endTime || postStaticProps.endTime)
  const hasClosed = dayjs().isAfter(endTime)
  const isDonee = data.donee === account
  return (
    <Post
      postProps={{
        ...postStaticProps,
        totalDonation,
        canceledDonations,
        refundRequests,
        hasClosed,
        endTime,
      }}
      isDonee={isDonee}
      ownDonation={ownDonation}
      seoProps={seoProps}
    />
  )
}
