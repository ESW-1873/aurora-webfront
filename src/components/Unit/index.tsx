import React, { VFC } from 'react'
import { IconMatic } from 'src/assets/svgs'
import { fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'

export const MaticUnit: VFC = () => (
  <IconAndUnit>
    <IconMatic />
    <UnitLabel>MATIC</UnitLabel>
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
