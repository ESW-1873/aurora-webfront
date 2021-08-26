import React, { VFC } from 'react'
import { EthUnit } from 'src/components/Unit'
import { fontWeightMedium } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { escapeRegExp } from 'src/utils/string'
import styled from 'styled-components'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

export const DonationInputPanel: VFC<{
  value: string | number
  onUserInput: (input: string) => void
  disabled?: boolean
}> = ({ value, onUserInput, disabled }) => {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }
  return (
    <LayoutDiv>
      <EthUnit />
      <Input
        value={value}
        placeholder="0.00"
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        minLength={1}
        maxLength={79}
        disabled={disabled}
        onChange={(event) => {
          enforcer(event.target.value.replace(/,/g, '.'))
        }}
      />
    </LayoutDiv>
  )
}

const Input = styled.input`
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
  border: 1px solid;
  border-radius: 34px;
  padding: 0 22px;
  > div {
    margin-right: 8px;
  }
`
