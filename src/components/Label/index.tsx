import React, { VFC } from 'react'
import { EthUnit } from 'src/components/Unit'
import { fontWeightMedium } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

export const EthValueLabel: VFC<{
  value: string
}> = ({ value }) => {
  return (
    <LayoutDiv>
      <EthUnit />
      <Label>{value}</Label>
    </LayoutDiv>
  )
}

const Label = styled.label`
  width: 100%;
  font-size: 24px;
  font-weight: ${fontWeightMedium};
  line-height: 1.25;
  text-align: right;
  text-overflow: ellipsis;
  overflow: hidden;
`

const LayoutDiv = styled.div`
  ${flexCenter}
  height: 56px;
  border-radius: 34px;
  padding: 0 22px;
  > div {
    margin-right: 8px;
  }
`
