import React, { VFC } from 'react'
import { Title } from 'src/assets/svgs'
import { Image } from 'src/components/Image'
import { black, lightblue, purple, white } from 'src/styles/colors'
import { fontWeightLight, fontWeightMedium } from 'src/styles/font'
import { absoluteFill, lessThanTablet } from 'src/styles/mixins'
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
          <ScoreBox score={CRE_PRICE} scoreLabel="CRE Price" />
          <ScoreBox score={TOTAL_LIQUIDITY} scoreLabel="Total Liquidity" />
          <ScoreBox score={ACTIVE_USERS} scoreLabel="Active Users" />
        </ScoreDiv>
      </Contents>
    </HeroHeaderSection>
  </>
)

type ScoreBoxProps = {
  score: string
  scoreLabel: string
}

const ScoreBox: VFC<ScoreBoxProps> = ({ score, scoreLabel }) => (
  <ScoreBoxContainer>
    <ScoreBoxBack />
    <ScoreBoxLabelDiv>
      <Score>{score}</Score>
      <ScoreLabel>{scoreLabel}</ScoreLabel>
    </ScoreBoxLabelDiv>
  </ScoreBoxContainer>
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

const ScoreBoxContainer = styled.div`
  width: 240px;
  height: 124px;
  position: relative;
  > div {
    border-radius: 16px;
  }
  :not(:last-child) {
    margin-right: 48px;
  }
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

const ScoreBoxBack = styled.div`
  ${absoluteFill};
  background: linear-gradient(135deg, ${purple}, 30%, ${lightblue});
  opacity: 0.95;
  filter: sepia(0.2);
`

const ScoreBoxLabelDiv = styled.div`
  background: ${white}10;
  font-weight: ${fontWeightMedium};
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Score = styled.h3`
  font-size: 36px;
  line-height: 1.28;
  letter-spacing: 0.016em;
  @media ${lessThanTablet} {
    font-size: 32px;
  }
`

const ScoreLabel = styled.p`
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