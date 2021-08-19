import React, { VFC } from 'react'
import { fontWeightSemiBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'

export const TotalDonationLabel: VFC<{ amountWei: string }> = ({
  amountWei,
}) => <Label>{`Total Donation: ${weiToEth(amountWei)} ETH`}</Label>

const Label = styled.label`
  width: 100%;
  display: inline-block;
  font-size: 40px;
  font-weight: ${fontWeightSemiBold};
  letter-spacing: -0.04em;
  @media ${breakpoint.m} {
    font-size: 20px;
  }
`
