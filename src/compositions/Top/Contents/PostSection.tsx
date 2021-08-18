import React, { VFC } from 'react'
import { TotalDonationLabel } from 'src/components/TotalDonationLabel'
import { fontWeightBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

type Props = {
  title: string
  totalDonation: number
  description: string
}

export const PostSection: VFC<Props> = ({
  title,
  totalDonation,
  description,
}) => (
  <Section>
    <Title>{title}</Title>
    <TotalDonationLabel amount={totalDonation} />
    <Description>{description}</Description>
  </Section>
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

const Section = styled.section`
  text-align: left;
  padding-top: 32px;
  padding-bottom: 64px;
  ${Title}, >label {
    margin-bottom: 32px;
  }
  @media ${breakpoint.m} {
    padding-top: 24px;
    padding-bottom: 40px;
    ${Title}, >label {
      margin-bottom: 24px;
    }
  }
`
