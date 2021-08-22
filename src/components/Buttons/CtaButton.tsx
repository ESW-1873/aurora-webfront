import { ButtonHTMLAttributes, VFC } from 'react'
import {
  errorColor,
  gray,
  primaryColor,
  purple,
  turquoise,
  white,
} from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { defaultShadow } from 'src/styles/mixins'
import styled from 'styled-components'

const PrimaryButtonBase: VFC<
  { label: string } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ label, ...props }) => (
  <PrimaryButtonElement {...props}>{label}</PrimaryButtonElement>
)

export const PrimaryButton = styled(PrimaryButtonBase)``

export const CancelButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => <CancelButtonElement {...props}>Cancel</CancelButtonElement>

export const RefundButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => <RefundButtonElement {...props}>Refund</RefundButtonElement>

export const RefundRequestButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> =
  ({ ...props }) => (
    <RefundButtonElement {...props}>Refund Request</RefundButtonElement>
  )

export const GetStartedButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => <GetStartedButtonElement {...props}>Get Started</GetStartedButtonElement>

export const PublishButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => <PublishButtonElement {...props}>Publish</PublishButtonElement>

export const BaseButtonElement = styled.button`
  height: 64px;
  width: 100%;
  max-width: 342px;
  border-radius: 32px;
  color: ${white};
  font-size: 20px;
  font-weight: ${fontWeightSemiBold};
  text-align: center;
  box-shadow: ${defaultShadow};
`

const PrimaryButtonElement = styled(BaseButtonElement)`
  background: ${purple};
  :hover,
  :focus {
    background: ${purple}bf;
  }
  :disabled {
    background: ${gray};
  }
`

const CancelButtonElement = styled(BaseButtonElement)`
  background: ${white};
  color: ${primaryColor} !important;
  border: 1px solid ${primaryColor};
  :hover,
  :focus {
    background: ${primaryColor};
    color: ${white} !important;
  }
`

const RefundButtonElement = styled(BaseButtonElement)`
  background: ${errorColor};
  :hover,
  :focus {
    background: ${errorColor}bf;
  }
`

const GetStartedButtonElement = styled(BaseButtonElement)`
  max-width: 400px;
  box-shadow: unset;
  border: 1px solid ${white}40;
  background: ${white}40;
  backdrop-filter: blur(8px) brightness(125%);
  :hover,
  :focus {
    background: ${turquoise}80;
  }
`

const PublishButtonElement = styled(BaseButtonElement)`
  display: block;
  margin: 0 auto;
  opacity: 0.5;
  background: ${purple};
  color: ${primaryColor};
  :enabled {
    opacity: 1;
    color: ${white};
    :hover,
    :focus {
      background: ${purple}80;
    }
  }
`
