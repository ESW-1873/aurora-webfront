import React, { VFC } from 'react'
import { IconEth } from 'src/assets/svgs'
import { fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'

export const EthUnit: VFC = () => (
  <IconAndUnit>
    <IconEth />
    <UnitLabel>ETH</UnitLabel>
  </IconAndUnit>
)

const UnitLabel = styled.span`
  font-weight: ${fontWeightSemiBold};
`

const IconAndUnit = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-right: 8px;
  }
`
