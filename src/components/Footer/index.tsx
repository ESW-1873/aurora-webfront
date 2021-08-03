import React, { VFC } from 'react'
import { FooterLogo } from 'src/assets/svgs'
import { white } from 'src/styles/colors'
import { fontWeightMedium, fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { Button } from '../Buttons'

export const Footer: VFC = () => {
  return (
    <>
      <FooterWrapper></FooterWrapper>
    </>
  )
}

const FooterWrapper: VFC = () => (
  <>
    <FooterOverlay>
      <FooterLayout>
        <FooterTitle />
        <Heading>Decentralized Donations</Heading>
        <Description>Ultimately Fast And Easy Online Fundraising.</Description>
        <GetStartedButton label="Get Started" />
      </FooterLayout>
    </FooterOverlay>
  </>
)

const FooterLayout = styled.div`
  color: ${white};
  text-align: center;
`

const FooterTitle: VFC = () => (
  <>
    <LogoWrapper>
      <FooterLogo />
    </LogoWrapper>
  </>
)

const FooterOverlay = styled.div`
  position: relative;
  background-image: url('/assets/images/footer.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 72px;
  margin-top: 64px;
`
const LogoWrapper = styled.div`
  position: relative;
  text-align: center;
`
const Heading = styled.h3`
  font-weight: ${fontWeightMedium};
  font-size: 18px;
  letter-spacing: -0.03em;
  line-height: 40px;
`
const Description = styled.h2`
  font-size: 24px;
  line-height: 32px;
  margin-top: 64px;
`

const GetStartedButton = styled(Button)`
  margin-top: 72px;
  background: ${white};
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: rgba(255, 255, 255, 0.35);
  font-weight: ${fontWeightSemiBold};
`
