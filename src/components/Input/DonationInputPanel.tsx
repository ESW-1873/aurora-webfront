import React, { VFC } from 'react'
import { EthUnit } from 'src/components/Unit'
import { fontWeightMedium } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled, { css } from 'styled-components'

export const DonationInputPanel: VFC<{
  disabled?: boolean
  amount?: number
}> = ({ disabled, amount }) => (
  <LayoutDiv isFixed={!!amount}>
    <EthUnit />
    {amount ? (
      <Label>{amount}</Label>
    ) : (
      <Input
        placeholder="0.00"
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        minLength={1}
        maxLength={79}
        disabled={disabled}
      />
    )}
  </LayoutDiv>
)

const baseStyle = css`
  font-size: 24px;
  font-weight: ${fontWeightMedium};
  line-height: 1.25;
  text-align: right;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Input = styled.input`
  ${baseStyle}
`

const Label = styled.label`
  ${baseStyle}
  width: 100%;
`

const LayoutDiv = styled.div<{ isFixed?: boolean }>`
  ${flexCenter}
  height: 56px;
  border: ${({ isFixed }) => (isFixed ? '' : '1px solid')};
  border-radius: 34px;
  padding: 0 22px;
  > div {
    margin-right: 8px;
  }
`
