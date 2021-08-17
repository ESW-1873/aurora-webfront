import React, { VFC } from 'react'
import { Image } from 'src/components/Image'
import { MOCK_POST } from 'src/constants/tmp/post'
import { breakpoint, noGuide } from 'src/styles/mixins'
import styled from 'styled-components'
import { ActionSection } from './ActionSection'
import { DonationSection } from './DonationSection'
import { PostSection } from './PostSection'

export const Contents: VFC = () => (
  <>
    <Layout>
      <ImageDiv>
        <Image src={MOCK_POST.image} alt="key visual" />
      </ImageDiv>
      <PostSection
        title={MOCK_POST.title}
        description={MOCK_POST.description}
        totalDonation={MOCK_POST.totalDonation}
      />
      <ActionSection postTitle={MOCK_POST.title} postId={MOCK_POST.id} />
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
