import React, { VFC } from 'react'
import { TopMaterial1, TopMaterial2 } from 'src/assets/svgs'
import { fontWeightMedium, fontWeightRegular } from 'src/styles/font'
import styled from 'styled-components'

export const MainSection: VFC = () => (
  <>
    <Section>
      <DescriptionDiv1>
        <TopMaterial1 />
        <TextDiv>
          <Heading>The Third Age of Credit</Heading>
          <Description>
            Since people trust that the value of a dollar will remain the same,
            money is deemed as credit. After that, credit was controlled by an
            institution in an algorithmic way. Finally, the time will come when
            credit will be democratized.
          </Description>
        </TextDiv>
      </DescriptionDiv1>
      <DescriptionDiv2>
        <TextDiv>
          <Heading>Stake your credit to anyone</Heading>
          <Description>
            Hologram is a trust network, in which everyone has credit and can
            stake it. Credit will be grown if you could operate it well.
            Hologram tells you the optimized relations, which to select and whom
            to connect.
          </Description>
        </TextDiv>
        <TopMaterial2 />
      </DescriptionDiv2>
    </Section>
  </>
)

const Section = styled.section`
  padding-bottom: 240px;
  @media screen and (max-width: 959px) {
    padding-bottom: 160px;
  }
`

const DescriptionDiv1 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  grid-column-gap: 7.4%;
  > svg {
    width: 100%;
  }

  :first-child {
    margin-bottom: 96px;
  }

  @media screen and (max-width: 959px) {
    grid-template-columns: 1fr;
    grid-row-gap: 38px;
  }
`

const DescriptionDiv2 = styled(DescriptionDiv1)`
  @media screen and (max-width: 959px) {
    > svg {
      grid-row-start: 1;
    }
  }
`

const TextDiv = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  max-width: 500px;

  @media screen and (max-width: 959px) {
    text-align: center;
    width: 100%;
    max-width: unset;
  }
`

const Heading = styled.h2`
  font-size: 32px;
  font-weight: ${fontWeightMedium};
  letter-spacing: 0.016em;
  line-height: 1.3;
  margin-bottom: 24px;

  @media screen and (max-width: 519px) {
    font-size: 24px;
  }
`

const Description = styled.p`
  font-size: 18px;
  font-weight: ${fontWeightRegular};
  letter-spacing: 0.024em;
  line-height: 1.7;

  @media screen and (max-width: 519px) {
    font-size: 14px;
  }
`
