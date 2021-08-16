import React, { VFC } from 'react'
import { FooterLogo } from 'src/assets/svgs'
import { GetStartedButton } from 'src/components/Buttons/CtaButton'
import { Image } from 'src/components/Image'
import { white } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import styled from 'styled-components'

export const Footer: VFC = () => {
  return (
    <FooterLayout>
      <Image src="/assets/images/footer.png" alt="FooterBackgroundImage" />
      <FooterLogo />
      <Heading>Decentralized Donations</Heading>
      <Description>Ultimately Fast And Easy Online Fundraising.</Description>
      <StyledGetStartedButton />
    </FooterLayout>
  )
}

const FooterLayout = styled.div`
  width: 100%;
  max-width: 896px;
  margin: 0 auto;
  position: relative;
  color: ${white};
  text-align: center;
`

const Heading = styled.h3`
  font-weight: ${fontWeightMedium};
  font-size: 18px;
  letter-spacing: -0.03em;
  line-height: calc(40 / 18);
`
const Description = styled.h2`
  font-size: 24px;
  line-height: calc(32 / 24);
  font-weight: ${fontWeightBold};
  margin-top: 64px;
`

const StyledGetStartedButton = styled(GetStartedButton)`
  margin-top: 72px;
`
