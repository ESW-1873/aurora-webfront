import { Dayjs } from 'dayjs'
import React, { VFC } from 'react'
import { CancelModal } from 'src/components/Modal/CancelModal'
import { DonationModal } from 'src/components/Modal/DonationModal'
import { RefundRequestModal } from 'src/components/Modal/RefundRequestModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { white } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { CONTENT_MAX_WIDTH, PageWrapper } from '../PageWrapper'
import { Contents, ContentsProps } from './Contents'

export type PostProps = {
  seoProps?: SEOProps
  postProps: ContentsProps & {
    endTime: Dayjs
  }
  donatedAmount: string
  receiptId: string
}
export const Post: VFC<PostProps> = ({
  donatedAmount,
  receiptId,
  postProps,
  seoProps,
}) => {
  const { id, keyVisual, description, totalDonation, endTime } = postProps
  return (
    <>
      <PageWrapper
        backgroundImage={keyVisual}
        description={`${description.slice(0, 100)}...`}
        {...seoProps}
      >
        <Contents {...postProps} />
      </PageWrapper>
      <FooterSpacer />
      <FixedFooter>
        <p>
          {postProps.hasClosed
            ? 'This donation has been closed.'
            : `This donation will end on ${endTime.format('MMMM D, YYYY')}`}
        </p>
      </FixedFooter>
      <WalletModal />
      <DonationModal postId={id} totalDonation={totalDonation} />
      <CancelModal receiptId={receiptId} cancelableAmount={donatedAmount} />
      <RefundRequestModal
        receiptId={receiptId}
        refundableAmount={donatedAmount}
      />
    </>
  )
}

const FOOTER_HEIGHT = '64px'
const FooterSpacer = styled.div`
  padding-top: ${FOOTER_HEIGHT};
`
const FixedFooter = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH};
  p {
    height: ${FOOTER_HEIGHT};
    backdrop-filter: blur(30px) brightness(1.15);
    background-color: ${white}26;
    ${flexCenter};
    font-weight: ${fontWeightSemiBold};
  }
`
