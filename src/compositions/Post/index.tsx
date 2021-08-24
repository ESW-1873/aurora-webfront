import { Dayjs } from 'dayjs'
import React, { VFC } from 'react'
import { Donation } from 'src/api/types'
import { CancelModal } from 'src/components/Modal/CancelModal'
import { DonationModal } from 'src/components/Modal/DonationModal'
import { RefundModal } from 'src/components/Modal/RefundModal'
import { RefundRequestModal } from 'src/components/Modal/RefundRequestModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { primaryColor, white } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled, { css } from 'styled-components'
import { CONTENT_MAX_WIDTH, PageWrapper } from '../PageWrapper'
import { Contents, ContentsProps } from './Contents'

export type PostProps = {
  seoProps?: SEOProps
  postProps: ContentsProps & {
    endTime: Dayjs
  }
  ownDonation?: Donation
  refundRequest?: Donation
  isDonee?: boolean
}
export const Post: VFC<PostProps> = ({
  isDonee,
  ownDonation,
  postProps,
  seoProps,
}) => {
  const { id, keyVisual, description, totalDonation, endTime, hasClosed } =
    postProps
  return (
    <>
      <StyledPageWrapper
        backgroundImage={keyVisual}
        backgroundColor={keyVisual ? undefined : primaryColor}
        description={`${description.slice(0, 100)}...`}
        {...seoProps}
      >
        <Contents {...postProps} hasDonated={!!ownDonation} isDonee={isDonee} />
      </StyledPageWrapper>
      {postProps.title && (
        <>
          <FooterSpacer />
          <FixedFooter>
            <p>
              {hasClosed
                ? 'This project has already been closed.'
                : `This project will end on ${endTime.format('MMMM D, YYYY')}`}
            </p>
          </FixedFooter>
        </>
      )}
      <WalletModal />
      <DonationModal postId={id} totalDonation={totalDonation} />
      {ownDonation &&
        (hasClosed ? (
          <RefundRequestModal ownDonation={ownDonation} />
        ) : (
          <CancelModal ownDonation={ownDonation} />
        ))}
      {isDonee && hasClosed && <RefundModal />}
    </>
  )
}

const StyledPageWrapper = styled(PageWrapper)<{ backgroundImage?: string }>`
  ${({ backgroundImage }) =>
    !backgroundImage &&
    css`
      background: ${white};
    `}
`
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
