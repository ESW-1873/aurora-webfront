import React, { ReactNode, VFC } from 'react'
import { Button } from 'src/components/Buttons'
import { Image } from 'src/components/Image'
import {
  black,
  buttonShadow,
  credit,
  donate,
  share,
  white,
} from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightLight,
  fontWeightMedium,
  fontWeightRegular,
  fontWeightSemiBold,
} from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

export const MainSection: VFC = () => (
  <>
    <Section>
      <ProjectImage />
      <ContentDiv>
        <ProjectSection />
        <ButtonSection />
        <DonationSection />
      </ContentDiv>
    </Section>
  </>
)

export const ProjectImage: VFC = () => {
  return (
    <>
      <ImageDiv>
        <Image src="/assets/images/top.png" alt="key visual" />
      </ImageDiv>
    </>
  )
}

const DonationSection: VFC = () => (
  <>
    <MarginDonation />
    <DoneeAddress />
    <CreditScore credit={123.213} />
    <Line />
    <CancelledDonationsWrapper />
  </>
)

const ButtonSection: VFC = () => (
  <ButtonDiv>
    <DonateButton label="Donate" />
    <ShareButton label="Share on Twitter" />
  </ButtonDiv>
)

const ProjectSection: VFC = () => (
  <TextDiv>
    <Title>The Bringing Doge into Outer Space</Title>
    <TotalDonation>Total Donation: 194.73 ETH</TotalDonation>
    <Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue
      porta felis, eget efficitur lectus bibendum a. Sed fermentum eleifend
      felis, at laoreet dui mattis eget. In ex risus, elementum eget dui at,
      gravida feugiat dolor. Nulla facilisi. Nulla vel tincidunt tortor, ac
      vulputate quam. In in libero ultricies, commodo velit vel, fringilla diam.
      Nam odio ligula, laoreet ut hendrerit id, tempor sed erat. Suspendisse at
      quam ac augue finibus ultrices et at magna. Proin pulvinar eu nunc eu
      varius. Nulla mattis lobortis est, facilisis bibendum nulla euismod id.
      Quisque consequat erat eu nisi imperdiet scelerisque. Pellentesque eget
      accumsan quam. Donec fringilla commodo posuere. Morbi condimentum pharetra
      lacus. Mauris consectetur orci quis nunc dictum molestie. Maecenas
      pulvinar eget.
    </Description>
  </TextDiv>
)

const DonationsWrapper: VFC<{ name: string; children?: ReactNode }> = ({
  name,
  children,
}) => (
  <>
    <DonationDiv>
      <Donations>{name}</Donations>
      {children}
    </DonationDiv>
  </>
)

const CancelledDonationsWrapper: VFC = () => (
  <>
    <DonationsWrapper name="Cancelled Donations">
      <CancelledDonations />
    </DonationsWrapper>
  </>
)

const CancelledDonations: VFC = () => (
  <ul>
    <li>
      <Address>0x6f3g…7cg3</Address>
    </li>
    <li>
      <Address>0x6f3g…7cg3</Address>
    </li>
    <li>
      <Address>0x6f3g…7cg3</Address>
    </li>
  </ul>
)

const CreditScore: VFC<{ credit: number }> = (credit) => {
  return DonationsWrapper({
    children: <Score>3201 CREDIT</Score>,
    name: 'Credit Sroce',
  })
}
const DoneeAddress: VFC = () => {
  return DonationsWrapper({
    children: <Address>0x6f3g…7cg3</Address>,
    name: 'Donee Address',
  })
}

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-block-start: 40px;
  @media ${breakpoint.m} {
    justify-content: center;
  }
`

const Section = styled.section`
  @media screen and (min-width: 2000px) {
    margin-top: 120px;
  }
`

const DonateButton = styled(Button)`
  color: ${white};
  font-weight: ${fontWeightSemiBold};
  margin-top: 16px;
  text-align: center;
  background: ${donate};
  box-shadow: 0px 3px 2px ${buttonShadow};
`

const CancelButton = styled(Button)`
  color: ${black};
  font-weight: ${fontWeightSemiBold};
  margin-top: 16px;
  text-align: center;
  background: ${white};
  box-shadow: 0px 3px 2px ${buttonShadow};
`

const ShareButton = styled(Button)`
  color: ${white};
  background: ${share};
  margin-top: 16px;
  box-shadow: 0px 3px 2px ${buttonShadow};
`

const ContentDiv = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  grid-column-gap: 7.4%;
  margin-top: 24px;

  :first-child {
    margin-bottom: 24px;
  }
`

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const TotalDonation = styled.h3`
  font-size: 20px;
  margin-bottom: 24px;
  letter-spacing: 0em;
`

const Title = styled.h2`
  font-size: 32px;
  font-weight: ${fontWeightMedium};
  letter-spacing: 0.016em;
  line-height: 1.3;
  margin-bottom: 24px;

  @media ${breakpoint.m} {
    font-size: 24px;
  }
`

const Description = styled.p`
  font-size: 16px;
  font-weight: ${fontWeightRegular};
  letter-spacing: 0.024em;
  line-height: 1.8;

  @media ${breakpoint.m} {
    font-size: 14px;
  }
`

const Score = styled.p`
  font-weight: ${fontWeightMedium};
  font-size: 20px;
  letter-spacing: -0.04em;
  line-height: 40px;
  text-align: right;
  color: ${credit};
`

const DonationDiv = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 16px;
`

const MarginDonation = styled.div`
  margin-top: 64px;
`
const Donations = styled.p`
  font-size: 20px;
  font-weight: ${fontWeightBold};
  line-height: 40px;
  text-align: left;
`

const Line = styled.hr`
  background: transparent;
  border: 1px dashed ${black};
  margin-top: 24px;
`

const Address = styled.a`
  font-weight: ${fontWeightLight};
  text-decoration: underline;
  font-size: 16px;
  letter-spacing: -0.04em;
  line-height: 40px;
  text-align: right;
`

const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  padding-top: 55%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
