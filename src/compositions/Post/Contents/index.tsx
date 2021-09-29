import React, { VFC } from 'react'
import { Donation } from 'src/api/types'
import { Image } from 'src/components/Image'
import { breakpoint, noGuide } from 'src/styles/mixins'
import styled from 'styled-components'
import { ActionSection } from './ActionSection'
import { DonationSection } from './DonationSection'
import { PostSection } from './PostSection'

export type ContentsProps = {
  id: string
  keyVisual: string
  title: string
  description: string
  donee: string
  hasClosed: boolean
  totalDonation: string
  refundRequests: Donation[]
  doneeCredit?: string
  hasWithdrawn?: boolean
}
export const Contents: VFC<
  ContentsProps & {
    isDonee?: boolean
    hasDonated?: boolean
    hasNoDonations?: boolean
  }
> = ({
  id,
  keyVisual,
  title,
  description,
  donee,
  totalDonation,
  refundRequests,
  doneeCredit,
  hasClosed,
  hasDonated,
  hasWithdrawn,
  isDonee,
  hasNoDonations,
}) => (
  <>
    <>
      {keyVisual ? (
        <ImageDiv>
          <Image src={keyVisual} alt="key visual" />
        </ImageDiv>
      ) : (
        <p>This project has already been closed.</p>
      )}
      <PostSection
        title={title}
        description={description}
        totalDonation={totalDonation}
      />
      <ActionSection
        postTitle={title}
        postId={id}
        isDonee={isDonee}
        hasClosed={hasClosed}
        hasDonated={hasDonated}
        hasRefundRequests={refundRequests.length > 0}
        hasWithdrawn={hasWithdrawn}
        hasNoDonations={hasNoDonations}
      />
      <DonationSection
        donee={donee}
        refundRequests={refundRequests}
        credit={doneeCredit}
        hasClosed={hasClosed}
        isDonee={isDonee}
      />
    </>
  </>
)

const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 66.7%;
  @media ${breakpoint.m} {
    ${noGuide}
    width: 100vw;
  }
`
