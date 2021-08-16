import React, { VFC } from 'react'
import { Image } from 'src/components/Image'
import { MOCK_POST } from 'src/constants/tmp/post'
import { breakpoint, noGuide } from 'src/styles/mixins'
import styled from 'styled-components'
import { ContentsSection } from './ContentsSection'
import { DonationSection } from './DonationSection'
import { StatusSection } from './StatusSection'

export const MainSection: VFC = () => (
  <>
    <SectionLayout>
      <ImageDiv>
        <Image src={MOCK_POST.image} alt="key visual" />
      </ImageDiv>
      <ContentsSection />
      <StatusSection />
      <DonationSection />
    </SectionLayout>
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

const SectionLayout = styled.section`
  padding-top: 64px;
  @media ${breakpoint.m} {
    padding-top: 0;
  }
`
