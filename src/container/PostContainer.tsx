import dayjs from 'dayjs'
import React, { VFC } from 'react'
import { usePostContent } from 'src/api/client'
import { INITIAL_POST } from 'src/api/initial'
import { SEOProps } from 'src/components/SEO'
import { Post, PostProps } from 'src/compositions/Post'
import { useWalletStore } from 'src/stores'
import { equals } from 'src/utils/address'

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
  const { data: result, refetch } = usePostContent(id)
  const data = result?.postContent || INITIAL_POST
  const totalDonation = data.donatedSum
  const ownDonation =
    (account &&
      data.donations?.find(({ sender }) => equals(sender, account))) ||
    undefined
  const refundRequests = data.refundRequested || []
  const endTime = dayjs.unix(data.endTime || postStaticProps.endTime)
  const hasClosed = dayjs().isAfter(endTime)
  const isDonee = equals(data.donee, account)
  // TODO: sample card の URL - postId よりサンプルカードgifのURLを計算する
  const sampleCardUrl =
    'https://pbblogassets.s3.amazonaws.com/uploads/2020/12/24154045/After-Effects-3D-Card-3D-Card-Rotating.gif'
  return (
    <Post
      postProps={{
        ...postStaticProps,
        totalDonation,
        sampleCardUrl,
        refundRequests,
        hasClosed,
        endTime,
        hasWithdrawn: data.withdrawn,
      }}
      isDonee={isDonee}
      ownDonation={ownDonation}
      seoProps={seoProps}
      hasNoDonations={!data.donations?.length}
      refetch={refetch}
    />
  )
}
