import React, { VFC } from 'react'
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
  totalDonation: string
}
export const Contents: VFC<ContentsProps> = ({
  id,
  keyVisual,
  title,
  description,
  totalDonation,
}) => (
  <>
    <Layout>
      <ImageDiv>
        <Image src={keyVisual} alt="key visual" />
      </ImageDiv>
      <PostSection
        title={title}
        description={description}
        totalDonation={totalDonation}
      />
      <ActionSection postTitle={title} postId={id} />
      <DonationSection />
    </Layout>
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

const Layout = styled.main`
  padding-top: 64px;
  @media ${breakpoint.m} {
    padding-top: 0;
  }
`
