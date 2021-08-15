import React, { VFC } from 'react'
import { IconMetamask, IconWalletConnect } from 'src/assets/svgs'
import { black, purple, white } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

type Props = {
  label: 'Metamask' | 'WalletConnect' | 'Install Metamask'
  onClick: VoidFunction
}

export const WalletOption: VFC<Props> = ({ label, onClick }) => (
  <WalletOptionButton onClick={onClick}>
    {(label === 'Metamask' || label === 'Install Metamask') && <IconMetamask />}
    {label === 'WalletConnect' && <IconWalletConnect />}
    <WalletLabel>{label}</WalletLabel>
  </WalletOptionButton>
)

const WalletLabel = styled.span`
  font-size: 20px;
  font-weight: ${fontWeightMedium};
  line-height: 1.4;
  margin-left: 8px;
`

const WalletOptionButton = styled.button`
  ${flexCenter}
  width: 100%;
  max-width: 262px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 32px;
  background-color: ${purple};
  color: ${white};
  box-shadow: 0 3px 2px ${black}29;
  > svg {
    height: 100%;
    width: 32px;
  }
  :hover,
  :focus {
    background-color: ${purple}bf;
  }
`
