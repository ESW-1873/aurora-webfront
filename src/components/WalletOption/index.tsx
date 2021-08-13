import React, { VFC } from 'react'
import { IconMetamask, IconWalletConnect } from 'src/assets/svgs'
import { purple, white } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
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
  width: 100%;
  max-width: 262px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background-color: ${purple};
  color: ${white};
  > svg {
    height: 100%;
    width: 32px;
  }
  :not(:last-child) {
    margin-bottom: 24px;
  }
  :hover {
    background-color: ${purple}bf;
  }
`
