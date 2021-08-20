import React, { VFC } from 'react'
import { FOOTER_SRC } from 'src/assets/images'
import { FooterLogo } from 'src/assets/svgs'
import { GetStartedButton } from 'src/components/Buttons/CtaButton'
import { Image } from 'src/components/Image'
import { white } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { breakpoint, flexCenter, noGuide, pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'

const HEADING_TEXT = 'Ultimately Fast And Easy Online Fundraising.'
const SUBHEADING_TEXT = 'Decentralized Donations'

export const Footer: VFC = () => {
  return (
    <FooterLayout>
      <Image src={FOOTER_SRC} alt="FooterBackgroundImage" />
      <FooterContainer>
        <FooterLogo />
        <SubHeadingBelowLogo>{SUBHEADING_TEXT}</SubHeadingBelowLogo>
        <Heading>{HEADING_TEXT}</Heading>
        <GetStartedButton />
      </FooterContainer>
    </FooterLayout>
  )
}
const Heading = styled.h2`
  font-size: 24px;
  line-height: 1.2;
  font-weight: ${fontWeightBold};
`
const SubHeadingBelowLogo = styled.h3`
  font-weight: ${fontWeightMedium};
  font-size: 18px;
  letter-spacing: -0.03em;
  line-height: 1.3;
`

const FooterContainer = styled.div`
  ${flexCenter};
  ${pageGuide};
  flex-direction: column;
  position: relative;
  padding-top: 64px;
  padding-bottom: 64px;
`

const FooterLayout = styled.footer`
  max-width: 896px;
  ${noGuide};
  position: relative;
  color: ${white};
  text-align: center;
  svg {
    margin-bottom: 4px;
  }
  ${SubHeadingBelowLogo} {
    margin-bottom: 40px;
  }
  ${Heading} {
    margin-bottom: 62px;
  }
  @media ${breakpoint.s} {
    ${SubHeadingBelowLogo} {
      margin-bottom: 32px;
    }
    ${Heading} {
      margin-bottom: 26px;
    }
  }
`
