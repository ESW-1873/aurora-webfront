import dayjs from 'dayjs'
import React, { VFC } from 'react'
import { CancelModal } from 'src/components/Modal/CancelModal'
import { DonationModal } from 'src/components/Modal/DonationModal'
import { RefundRequestModal } from 'src/components/Modal/RefundRequestModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { useGetPostContentQuery } from 'src/__generated__/graphql'
import { PageWrapper } from '../PageWrapper'
import { Contents, ContentsProps } from './Contents'

export type PostProps = {
  seoProps?: SEOProps
  postStaticProps: Pick<
    ContentsProps,
    'id' | 'keyVisual' | 'title' | 'description' | 'donee'
  >
}
export const Post: VFC<PostProps> = ({ postStaticProps, seoProps }) => {
  // TODO fetch from wallet
  const myAddress = '0xa8fffef192a21f9a45b68d49aa0d0753b9b6e79f'
  const { id, keyVisual, description } = postStaticProps
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
  const hasClosed = dayjs().isAfter(data?.endTime)
  return (
    <>
      <PageWrapper
        backgroundImage={keyVisual}
        description={`${description.slice(0, 100)}...`}
        {...seoProps}
      >
        <Contents
          {...postStaticProps}
          totalDonation={totalDonation}
          canceledDonations={canceledDonations}
          hasClosed={hasClosed}
        />
      </PageWrapper>
      <WalletModal />
      <DonationModal totalDonation={totalDonation} />
      <CancelModal cancelableAmount={donatedAmount} />
      <RefundRequestModal refundableAmount={donatedAmount} />
    </>
  )
}
