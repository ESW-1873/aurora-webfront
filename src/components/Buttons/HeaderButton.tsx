import { ButtonHTMLAttributes, VFC } from 'react'
import { errorColor, primaryColor, white } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import styled, { css } from 'styled-components'

type HeaderButtonProps = {
  label: string
  hasAccount?: boolean
  hasError?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const HeaderButton: VFC<HeaderButtonProps> = ({
  label,
  hasAccount,
  hasError,
  ...props
}) => (
  <HeaderButtonElement hasAccount={hasAccount} hasError={hasError} {...props}>
    {label}
  </HeaderButtonElement>
)
const HeaderButtonElement = styled.button<{
  hasAccount?: boolean
  hasError?: boolean
}>`
  width: 152px;
  height: 34px;
  border-radius: 17px;
  border: 1px solid ${primaryColor};
  font-size: 14px;
  font-weight: ${fontWeightMedium};
  text-align: center;
  :focus,
  :hover {
    background-color: ${primaryColor};
    color: ${white};
  }
  ${({ hasAccount }) =>
    hasAccount
      ? css`
          background-color: ${primaryColor};
          color: ${white};
          border: unset;
          :focus,
          :hover {
            background-color: ${primaryColor}b0;
          }
        `
      : ''}
  ${({ hasError }) =>
    hasError
      ? css`
          background-color: ${errorColor};
          color: ${white};
          border: unset;
          :focus,
          :hover {
            background-color: ${errorColor}a6;
          }
        `
      : ''}
`
