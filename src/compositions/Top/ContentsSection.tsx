import React, { VFC } from 'react'
import { MOCK_POST } from 'src/constants/tmp/post'
import { fontWeightBold, fontWeightSemiBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

const SAMPLE_TOTAL_DONATION = 194.73

export const ContentsSection: VFC = () => (
  <ContentsDiv>
    <Title>{MOCK_POST.title}</Title>
    <TotalDonation>{`Total Donation: ${SAMPLE_TOTAL_DONATION} ETH`}</TotalDonation>
    <Description>{MOCK_POST.description}</Description>
  </ContentsDiv>
)

const Title = styled.h2`
  font-size: 64px;
  font-weight: ${fontWeightBold};
  line-height: 1;
  @media ${breakpoint.m} {
    font-size: 32px;
    line-height: 1.2;
  }
`

const TotalDonation = styled.h3`
  font-size: 40px;
  font-weight: ${fontWeightSemiBold};
  letter-spacing: -0.04em;
  @media ${breakpoint.m} {
    font-size: 20px;
  }
`

const Description = styled.p`
  font-size: 20px;
  line-height: 2;
  letter-spacing: 0.03em;
  @media ${breakpoint.m} {
    font-size: 16px;
    line-height: unset;
    letter-spacing: unset;
    line-height: calc(24 / 16);
  }
`

const ContentsDiv = styled.div`
  text-align: left;
  padding-top: 32px;
  padding-bottom: 64px;
  ${Title}, ${TotalDonation} {
    margin-bottom: 32px;
  }
  @media ${breakpoint.m} {
    padding-top: 24px;
    padding-bottom: 40px;
    ${Title}, ${TotalDonation} {
      margin-bottom: 24px;
    }
  }
`
