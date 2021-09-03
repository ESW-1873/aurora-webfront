import { Dayjs } from 'dayjs'
import React, { memo, VFC } from 'react'
import { Donation, PostContent } from 'src/api/types'
import { CancelModal } from 'src/components/Modal/CancelModal'
import { DonationModal } from 'src/components/Modal/DonationModal'
import { ModelViewerModal } from 'src/components/Modal/ModelViewerModal'
import { RefundModal } from 'src/components/Modal/RefundModal'
import { RefundRequestModal } from 'src/components/Modal/RefundRequestModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { WithdrawModal } from 'src/components/Modal/WithdrawModal'
import { SEOProps } from 'src/components/SEO'
import { primaryColor, white } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, flexCenter } from 'src/styles/mixins'
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
  hasNoDonations?: boolean
  refetch: () => Promise<PostContent>
}
export const Post: VFC<PostProps> = memo(
  ({ isDonee, ownDonation, postProps, seoProps, hasNoDonations, refetch }) => {
    const { id, keyVisual, description, totalDonation, endTime, hasClosed } =
      postProps
    return (
      <>
        <StyledPageWrapper
          backgroundImage={keyVisual}
          backgroundColor={keyVisual ? undefined : primaryColor}
          description={`${description.slice(0, 100)}...`}
          {...seoProps}
          noindex
        >
          <Contents
            {...postProps}
            hasDonated={!!ownDonation}
            isDonee={isDonee}
            hasNoDonations={hasNoDonations}
          />
        </StyledPageWrapper>
        {postProps.title && (
          <>
            <FooterSpacer />
            <FixedFooter>
              <p>
                {hasClosed
                  ? 'This project has already been closed.'
                  : `This project will end on ${endTime.format(
                      'MMMM D, YYYY',
                    )}`}
              </p>
            </FixedFooter>
          </>
        )}
        <WalletModal />
        <DonationModal
          postId={id}
          totalDonation={totalDonation}
          refetch={refetch}
        />
        <ModelViewerModal />
        {ownDonation &&
          (hasClosed ? (
            <RefundRequestModal postId={id} ownDonation={ownDonation} />
          ) : (
            <CancelModal ownDonation={ownDonation} />
          ))}
        {isDonee && hasClosed && (
          <>
            <WithdrawModal postId={id} amount={totalDonation} />
            <RefundModal />
          </>
        )}
      </>
    )
  },
)

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
  @media ${breakpoint.m} {
    p {
      backdrop-filter: blur(30px) brightness(0.9);
    }
  }
`
