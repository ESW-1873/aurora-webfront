import React, { VFC } from 'react'
import { Title } from 'src/assets/svgs'
import { Image } from 'src/components/Image'
import { black, lightblue, purple } from 'src/styles/colors'
import { fontWeightLight, fontWeightMedium } from 'src/styles/font'
import { lessThanTablet } from 'src/styles/mixins'
import styled from 'styled-components'

const CRE_PRICE = '$0.57'
const TOTAL_LIQUIDITY = '$5.8m'
const ACTIVE_USERS = '1,000'

export const HeroHeader: VFC = () => (
  <>
    <HeroHeaderSection>
      <ImageDiv>
        <Image src="/assets/images/top_background.png" alt="key visual" />
        <Filter />
      </ImageDiv>
      <Contents>
        <StyledTitle />
        <SubTitle>DECENTRALIZED CREDIT PROTOCOL</SubTitle>
        <ScoreDiv>
          <ScoreBox>
            <Score>{CRE_PRICE}</Score>
            <ScoreName>CRE Price</ScoreName>
          </ScoreBox>
          <ScoreBox>
            <Score>{TOTAL_LIQUIDITY}</Score>
            <ScoreName>Total Liquidity</ScoreName>
          </ScoreBox>
          <ScoreBox>
            <Score>{ACTIVE_USERS}</Score>
            <ScoreName>Active Users</ScoreName>
          </ScoreBox>
        </ScoreDiv>
      </Contents>
    </HeroHeaderSection>
  </>
)

const Contents = styled.div`
  width: 100%;
`

const Filter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 16.6%;
  background: linear-gradient(${black}00, ${black});
`

const ImageDiv = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  padding-top: 1129px;
  @media ${lessThanTablet} {
    padding-top: 100%;
  }
`

const ScoreBox = styled.div`
  border-radius: 16px;
  width: 240px;
  height: 124px;
  font-weight: ${fontWeightMedium};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :not(:last-child) {
    margin-right: 48px;
  }

  // TODO: 要調整
  background: linear-gradient(135deg, ${purple}, 30%, ${lightblue});
  backdrop-filter: blur(30px) brightness(115%);

  @media ${lessThanTablet} {
    width: 100%;
    max-width: 320px;
    height: 88px;
    :not(:last-child) {
      margin-right: unset;
      margin-bottom: 32px;
    }
  }
`

const Score = styled.h3`
  font-size: 36px;
  line-height: 1.28;
  letter-spacing: 0.016em;
  @media ${lessThanTablet} {
    font-size: 32px;
  }
`

const ScoreName = styled.p`
  font-size: 12px;
  line-height: 1.25;
  letter-spacing: 0.012em;
  opacity: 0.5;
`

const ScoreDiv = styled.div`
  display: flex;
  justify-content: center;
  @media ${lessThanTablet} {
    flex-direction: column;
    align-items: center;
  }
`

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: ${fontWeightLight};
  letter-spacing: 0.72em;
  text-indent: 0.72em;
  line-height: 1.5;
  padding-bottom: 96px;

  @media ${lessThanTablet} {
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: 0.16em;
    text-indent: 0.16em;
    padding-bottom: 64px;
  }
`

const HeroHeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 190px;
  padding-bottom: 340px;

  @media ${lessThanTablet} {
    padding-top: 60px;
    padding-bottom: 80px;
  }
`

const StyledTitle = styled(Title)`
  width: 82.4%;
  height: 100%;
  margin-bottom: 56px;

  @media ${lessThanTablet} {
    width: 94%;
    max-width: 540px;
    margin-bottom: 32px;
  }
`
