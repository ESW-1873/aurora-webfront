import React, { VFC } from 'react'
import { CancelModal } from 'src/components/Modal/CancelModal'
import { DonationModal } from 'src/components/Modal/DonationModal'
import { RefundRequestModal } from 'src/components/Modal/RefundRequestModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { MOCK_DONATION } from 'src/constants/tmp/donation'
import { MOCK_POST } from 'src/constants/tmp/post'
import { PageWrapper } from '../PageWrapper'
import { Contents } from './Contents'

//TODO: ページ生成時にデータ注入。（ページロード時に取得する系のデータも一旦全部MOCKになってます）
export const Post: VFC<SEOProps> = ({ ...seoProps }) => (
  <>
    <PageWrapper backgroundImage={MOCK_POST.imageUrl} {...seoProps}>
      <Contents />
    </PageWrapper>
    <WalletModal />
    <DonationModal totalDonation={MOCK_POST.donatedSum} />
    <CancelModal cancelableAmount={MOCK_DONATION.amount} />
    <RefundRequestModal refundableAmount={MOCK_DONATION.amount} />
  </>
)
