import { ButtonHTMLAttributes, VFC } from 'react'
import { IconTwitter } from 'src/assets/svgs'
import {
  errorColor,
  primaryColor,
  purple,
  twitter,
  white,
} from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { defaultShadow, flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

export const PrimaryButton: VFC<
  { label: string } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ label, ...props }) => (
  <PrimaryButtonElement {...props}>{label}</PrimaryButtonElement>
)

export const ShareButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => (
  <ShareButtonElement {...props}>
    <IconTwitter />
    <span>Share on Twitter</span>
  </ShareButtonElement>
)

export const CancelButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => <CancelButtonElement {...props}>Cancel</CancelButtonElement>

export const RefundButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => <RefundButtonElement {...props}>Refund Request</RefundButtonElement>

export const GetStartedButton: VFC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => <GetStartedButtonElement {...props}>Get Started</GetStartedButtonElement>

const BaseButtonElement = styled.button`
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
`

const ShareButtonElement = styled(BaseButtonElement)`
  ${flexCenter}
  background: ${twitter};
  font-size: 16px;
  > svg {
    margin-right: 8px;
    width: 24px;
    height: 100%;
  }
`

const CancelButtonElement = styled(BaseButtonElement)`
  background: ${white};
  color: ${primaryColor};
  border: 1px solid ${primaryColor};
`

const RefundButtonElement = styled(BaseButtonElement)`
  background: ${errorColor};
`

const GetStartedButtonElement = styled(BaseButtonElement)`
  max-width: 400px;
  box-shadow: unset;
  border: 1px solid ${white}40;
  background: ${white}40;
  backdrop-filter: blur(8px) brightness(125%);
`
