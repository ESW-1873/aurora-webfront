import React, { VFC } from 'react'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { CancelModal } from 'src/components/Modal/CancelModal'
import { DonationModal } from 'src/components/Modal/DonationModal'
import { RefundRequestModal } from 'src/components/Modal/RefundRequestModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEO, SEOProps } from 'src/components/SEO'
import { MOCK_DONATION } from 'src/constants/tmp/donation'
import { MOCK_POST } from 'src/constants/tmp/post'
import { white } from 'src/styles/colors'
import { pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'
import { BlurredBackground } from './BlurredBackground'
import { Contents } from './Contents'

export const Post: VFC<SEOProps> = ({ ...seoProps }) => (
  <>
    <SEO {...seoProps} />
    <BlurredBackground imageUrl={MOCK_POST.imageUrl} />
    <Layout>
      <Header />
      <Contents />
    </Layout>
    <Footer />
    <WalletModal />
    <DonationModal totalDonation={MOCK_POST.donatedSum} />
    <CancelModal cancelableAmount={MOCK_DONATION.amount} />
    <RefundRequestModal refundableAmount={MOCK_DONATION.amount} />
  </>
)

export const Layout = styled.div`
  ${pageGuide};
  margin: 0 auto;
  max-width: 896px;
  width: 100%;
  padding-bottom: 64px;
  background: ${white}26;
  backdrop-filter: blur(30px) brightness(115%);
`
