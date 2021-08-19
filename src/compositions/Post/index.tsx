import React, { VFC } from 'react'
import { CancelModal } from 'src/components/Modal/CancelModal'
import { DonationModal } from 'src/components/Modal/DonationModal'
import { RefundRequestModal } from 'src/components/Modal/RefundRequestModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { MOCK_DONATION } from 'src/constants/tmp/donation'
import { MOCK_POST } from 'src/constants/tmp/post'
import { PageWrapper } from '../PageWrapper'
import { Contents, ContentsProps } from './Contents'

export type PostProps = SEOProps & Omit<ContentsProps, 'totalDonation'>
export const Post: VFC<PostProps> = ({
  id,
  title,
  keyVisual,
  description,
  ...seoProps
}) => (
  <>
    <PageWrapper backgroundImage={keyVisual} {...seoProps}>
      <Contents
        id={id}
        title={title}
        description={description}
        keyVisual={keyVisual}
        totalDonation={'0'}
      />
    </PageWrapper>
    <WalletModal />
    <DonationModal totalDonation={MOCK_POST.donatedSum} />
    <CancelModal cancelableAmount={MOCK_DONATION.amount} />
    <RefundRequestModal refundableAmount={MOCK_DONATION.amount} />
  </>
)
