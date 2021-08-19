import React, { VFC } from 'react'
import { CancelModal } from 'src/components/Modal/CancelModal'
import { DonationModal } from 'src/components/Modal/DonationModal'
import { RefundRequestModal } from 'src/components/Modal/RefundRequestModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { PageWrapper } from '../PageWrapper'
import { Contents, ContentsProps } from './Contents'

export type PostProps = {
  seoProps?: SEOProps
  postProps: ContentsProps
  donatedAmount: string
}
export const Post: VFC<PostProps> = ({
  donatedAmount,
  postProps,
  seoProps,
}) => {
  const { keyVisual, description, totalDonation } = postProps
  return (
    <>
      <PageWrapper
        backgroundImage={keyVisual}
        description={`${description.slice(0, 100)}...`}
        {...seoProps}
      >
        <Contents {...postProps} />
      </PageWrapper>
      <WalletModal />
      <DonationModal totalDonation={totalDonation} />
      <CancelModal cancelableAmount={donatedAmount} />
      <RefundRequestModal refundableAmount={donatedAmount} />
    </>
  )
}
