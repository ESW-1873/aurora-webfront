import React, { VFC } from 'react'
import { useMediaPredicate } from 'react-media-hook'
import { Title } from 'src/assets/svgs'
import { Image } from 'src/components/Image'
import { BaseParticles } from 'src/components/Particles'
import { black, lightblue, purple, white } from 'src/styles/colors'
import { fontWeightLight, fontWeightMedium } from 'src/styles/font'
import { absoluteFill, breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

const CRE_PRICE = '$0.57'
const TOTAL_LIQUIDITY = '$5.8m'
const ACTIVE_USERS = '1,000'

export const HeroHeader: VFC = () => {
  const isSP = useMediaPredicate('(max-width: 480px)')
  return (
    <>
      <HeroHeaderSection>
        <ImageDiv>
          <Image
            src="/assets/images/top_background.png"
            alt="key visual"
            priority={true}
            loading="eager"
          />
          <BaseParticles
            particles_number={isSP ? 120 : 40}
            line_linked_distance={isSP ? 80 : 120}
          />
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
}

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
  height: 100%;
  @media ${breakpoint.m} {
    height: 0;
    padding-top: 100%;
  }
  @media screen and (min-width: 2000px) {
    height: 0;
    padding-top: 42.67%;
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
  @media ${breakpoint.m} {
    width: 100%;
    max-width: 320px;
    height: 72px;
    > div {
      border-radius: 12px;
    }
    :not(:last-child) {
      margin-right: unset;
      margin-bottom: 14px;
    }
  }
`

const ScoreBoxBack = styled.div`
  ${absoluteFill};
  background: linear-gradient(135deg, ${purple}a8, 30%, ${lightblue}a8);
  backdrop-filter: blur(30px) opacity(0.75) brightness(115%);
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
  @media ${breakpoint.m} {
    flex-direction: row;
    justify-content: start;
  }
`

const Score = styled.h3`
  font-size: 36px;
  line-height: 1.28;
  letter-spacing: 0.016em;
  @media ${breakpoint.m} {
    font-size: 28px;
    margin-right: 12px;
    width: 100%;
    text-align: right;
  }
`

const ScoreLabel = styled.p`
  font-size: 12px;
  line-height: 1.25;
  letter-spacing: 0.012em;
  opacity: 0.5;
  @media ${breakpoint.m} {
    font-size: 12px;
    width: 100%;
    text-align: left;
    line-height: 1.28;
  }
`

const ScoreDiv = styled.div`
  display: flex;
  justify-content: center;
  @media ${breakpoint.m} {
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

  @media ${breakpoint.m} {
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

  @media ${breakpoint.m} {
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

  @media ${breakpoint.m} {
    padding-top: 60px;
    padding-bottom: 140px;
  }
  @media ${breakpoint.s} {
    padding-top: 40px;
    padding-bottom: 120px;
  }
`
