import React, { VFC } from 'react'
import { Title } from 'src/assets/svgs'
import { fontWeightLight, fontWeightMedium } from 'src/styles/font'
import styled from 'styled-components'

const CRE_PRICE = '$0.57'
const TOTAL_LIQUIDITY = '$5.8m'
const ACTIVE_USERS = '1,000'

export const HeroHeader: VFC = () => (
  <>
    <HeroHeaderSection>
      {/* <ImageDiv>
        <Image src="/assets/images/top_background.png" alt="" />
      </ImageDiv> */}
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
  /* position: absolute; */
  /* inset: 0; */
  /* margin: auto; */
`

const ImageDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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
  background: linear-gradient(135deg, #6457a6, #0f5a76);
`

const Score = styled.h3`
  font-size: 36px;
  line-height: 1.28;
  letter-spacing: 0.016em;
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
`

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: ${fontWeightLight};
  letter-spacing: 0.72em;
  text-indent: 0.72em;
  line-height: 1.5;
  padding-bottom: 96px;
`

const HeroHeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 240px;
  padding-bottom: 340px;
`

const StyledTitle = styled(Title)`
  width: 82.4%;
  height: 100%;
  margin-bottom: 56px;
`
