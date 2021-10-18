import React, { VFC } from 'react'
import { CustomLinkify } from 'src/components/CustomLinkify'
import { TotalDonationLabel } from 'src/components/TotalDonationLabel'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

type Props = {
  title: string
  totalDonation: string
  description: string
}

export const PostSection: VFC<Props> = ({
  title,
  totalDonation,
  description,
}) => (
  <Section>
    <h2>{title}</h2>
    <TotalDonationLabel amountWei={totalDonation} />
    <CustomLinkify text={description} />
  </Section>
)

const Section = styled.section`
  text-align: left;
  padding-top: 32px;
  padding-bottom: 64px;
  h2,
  > label {
    margin-bottom: 32px;
  }
  a {
    text-decoration: underline;
  }
  @media ${breakpoint.m} {
    padding-top: 24px;
    padding-bottom: 40px;
    h2,
    > label {
      margin-bottom: 24px;
    }
  }
`
