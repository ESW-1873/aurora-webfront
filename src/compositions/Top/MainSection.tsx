import React, { VFC } from 'react'
import { Image } from 'src/components/Image'
import { fontWeightMedium, fontWeightRegular } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

export const MainSection: VFC = () => (
  <>
    <Section>
      <DescriptionDiv1>
        <ImageDiv>
          <Image
            src="/assets/images/top_material_1.png"
            alt=""
            width={500}
            height={372}
            layout="responsive"
          />
        </ImageDiv>
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
        <TextDiv2>
          <Heading>Stake your credit to anyone</Heading>
          <Description>
            Hologram is a trust network, in which everyone has credit and can
            stake it. Credit will be grown if you could operate it well.
            Hologram tells you the optimized relations, which to select and whom
            to connect.
          </Description>
        </TextDiv2>
        <ImageDiv>
          <Image
            src="/assets/images/top_material_2.png"
            alt=""
            width={540}
            height={438}
            layout="responsive"
          />
        </ImageDiv>
      </DescriptionDiv2>
    </Section>
  </>
)

const ImageDiv = styled.div`
  @media ${breakpoint.m} {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
`

const Section = styled.section`
  padding-bottom: 240px;
  @media ${breakpoint.m} {
    padding-bottom: 120px;
  }
  @media screen and (min-width: 2000px) {
    margin-top: 120px;
  }
`

const DescriptionDiv1 = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  grid-column-gap: 7.4%;

  :first-child {
    margin-bottom: 96px;
  }

  @media ${breakpoint.m} {
    grid-template-columns: 1fr;
    grid-row-gap: 38px;
  }
`

const DescriptionDiv2 = styled(DescriptionDiv1)`
  @media ${breakpoint.m} {
    ${ImageDiv} {
      grid-row-start: 1;
    }
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

const TextDiv2 = styled(TextDiv)`
  text-align: right;
  @media ${breakpoint.m} {
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

  @media ${breakpoint.m} {
    font-size: 24px;
  }
`

const Description = styled.p`
  font-size: 18px;
  font-weight: ${fontWeightRegular};
  letter-spacing: 0.024em;
  line-height: 1.7;

  @media ${breakpoint.m} {
    font-size: 14px;
  }
`
