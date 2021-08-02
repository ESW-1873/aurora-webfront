import React, { VFC } from 'react'
import { Button } from 'src/components/Buttons'
import { white } from 'src/styles/colors'
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
      <DescriptionDiv>
        <TextDiv>
          <Title>The Bringing Doge into Outer Space</Title>
          <TotalDonation>Total Donation: 194.73 ETH</TotalDonation>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            congue porta felis, eget efficitur lectus bibendum a. Sed fermentum
            eleifend felis, at laoreet dui mattis eget. In ex risus, elementum
            eget dui at, gravida feugiat dolor. Nulla facilisi. Nulla vel
            tincidunt tortor, ac vulputate quam. In in libero ultricies, commodo
            velit vel, fringilla diam. Nam odio ligula, laoreet ut hendrerit id,
            tempor sed erat. Suspendisse at quam ac augue finibus ultrices et at
            magna. Proin pulvinar eu nunc eu varius. Nulla mattis lobortis est,
            facilisis bibendum nulla euismod id. Quisque consequat erat eu nisi
            imperdiet scelerisque. Pellentesque eget accumsan quam. Donec
            fringilla commodo posuere. Morbi condimentum pharetra lacus. Mauris
            consectetur orci quis nunc dictum molestie. Maecenas pulvinar eget.
          </Description>
        </TextDiv>
        <DonateButton label="Donate" />
        <ShareButton label="Share on Twitter" />
      </DescriptionDiv>
      <DoneeAddress />
    </Section>
  </>
)

const Section = styled.section`
  @media screen and (min-width: 2000px) {
    margin-top: 120px;
  }
`

const DonateButton = styled(Button)`
  margin-top: 40px;
  color: ${white};
  font-weight: ${fontWeightSemiBold};
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: ${white};
  position: relative;
`

const ShareButton = styled(Button)`
  position: relative;
  color: ${white};
  width: 342px;
  height: 64px;
  border-radius: 32px;
  background: #1da1f2;
  margin-top: 16px;
`

const DescriptionDiv = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  grid-column-gap: 7.4%;
  margin-top: 24px;

  :first-child {
    margin-bottom: 24px;
  }

  @media ${breakpoint.m} {
    grid-template-columns: 1fr;
    grid-row-gap: 38px;
  }
`

const TextDiv = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  max-width: 500px;

  @media ${breakpoint.m} {
    text-align: center;
    width: 100%;
    max-width: unset;
  }
`
const TotalDonation = styled.h3`
  font-size: 20px;
  margin-bottom: 24px;
  text-align: left;
  letter-spacing: 0em;
`
const Title = styled.h2`
  font-size: 32px;
  font-weight: ${fontWeightMedium};
  letter-spacing: 0.016em;
  line-height: 1.3;
  margin-bottom: 24px;
  text-align: left;

  @media ${breakpoint.m} {
    font-size: 24px;
  }
`

const Description = styled.p`
  font-size: 16px;
  font-weight: ${fontWeightRegular};
  letter-spacing: 0.024em;
  line-height: 1.8;
  text-align: left;

  @media ${breakpoint.m} {
    font-size: 14px;
  }
`
const DoneeAddress: VFC = () => {
  return (
    <>
      <Donations>Donee Address</Donations>
      <Address>0x6f3g…7cg3</Address>
    </>
  )
}
const Donations = styled.p`
  font-size: 20px;
  font-weight: ${fontWeightBold};
  line-height: 40px;
  text-align: left;
  margin-top: 64px;
`

const Address = styled.a`
  font-weight: ${fontWeightLight};
  text-decoration: underline;
  font-size: 16px;
  letter-spacing: -0.04em;
  line-height: 40px;
  text-align: right;
`
