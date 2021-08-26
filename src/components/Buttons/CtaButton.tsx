import { ButtonHTMLAttributes, VFC } from 'react'
import { useWalletModalStore, useWalletStore } from 'src/stores'
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

type ButtonProps = { label?: string } & ButtonHTMLAttributes<HTMLButtonElement>
const PrimaryButtonBase: VFC<ButtonProps & { label: string }> = ({
  label,
  ...props
}) => <PrimaryButtonElement {...props}>{label}</PrimaryButtonElement>

type AsTxButtonHoc = <T extends ButtonProps>(Component: VFC<T>) => VFC<T>

const asTxButton: AsTxButtonHoc = (ButtonComponent) => (props) => {
  const { active } = useWalletStore()
  const { open } = useWalletModalStore()
  return active ? (
    <ButtonComponent {...props} />
  ) : (
    <ButtonComponent
      {...props}
      disabled={false}
      label="Connect Wallet"
      type="button"
      onClick={open}
    />
  )
}

export const PrimaryButton = styled(PrimaryButtonBase)``
export const PrimaryTxButton = styled(asTxButton(PrimaryButtonBase))``

export const CancelButton: VFC<ButtonProps> = asTxButton(
  ({ label = 'Cancel', ...props }) => (
    <CancelButtonElement {...props}>{label}</CancelButtonElement>
  ),
)

export const RefundButton: VFC<ButtonProps> = asTxButton(
  ({ label = 'Refund', ...props }) => (
    <RefundButtonElement {...props}></RefundButtonElement>
  ),
)

export const RefundRequestButton: VFC<ButtonProps> = asTxButton(
  ({ label = 'Refund Request', ...props }) => (
    <RefundButtonElement {...props}>{label}</RefundButtonElement>
  ),
)

export const GetStartedButton: VFC<Omit<ButtonProps, 'label'>> = (props) => (
  <GetStartedButtonElement {...props}>Get Started</GetStartedButtonElement>
)

export const PublishButton: VFC<ButtonProps> = asTxButton(
  ({ label = 'Publish', ...props }) => (
    <PublishButtonElement {...props}>{label}</PublishButtonElement>
  ),
)

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
  background: ${purple}80;
  color: ${primaryColor}80;
  :enabled {
    background: ${purple};
    color: ${white};
    :hover,
    :focus {
      background: ${purple}80;
    }
  }
`
