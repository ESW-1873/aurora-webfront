import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import React, { VFC } from 'react'
import { HeaderButton } from 'src/components/Buttons'
import { Logo } from 'src/components/Logo'
import { Link } from 'src/elements/Link'
import { useWalletModalStore } from 'src/stores'
import { errorColor, primaryColor, white } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { shortenAddress } from 'src/utils/address'
import { TOP } from 'src/utils/router'
import styled, { css } from 'styled-components'

export const Header: VFC = () => {
  const { account, error } = useWeb3React()
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError
  const { open: openWalletModal } = useWalletModalStore()
  return (
    <>
      <HeaderLayout>
        <Link href={TOP}>
          <Logo />
        </Link>
        {isUnsupportedChainIdError ? (
          <ErrorButton onClick={openWalletModal}>{'Wrong Network'}</ErrorButton>
        ) : account ? (
          <AddressButton onClick={openWalletModal}>
            {shortenAddress(account)}
          </AddressButton>
        ) : (
          <HeaderButton label="Connect Wallet" onClick={openWalletModal} />
        )}
      </HeaderLayout>
    </>
  )
}

const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`

const baseButtonStyle = css`
  font-size: 14px;
  font-weight: ${fontWeightMedium};
  line-height: 1.3;
  border-radius: 17px;
  padding: 8px 29px;
  text-align: center;
`

const AddressButton = styled.button`
  ${baseButtonStyle}
  background-color: ${primaryColor};
  color: ${white};
  :focus,
  :hover {
    background-color: ${primaryColor}b0;
  }
`

const ErrorButton = styled.button`
  ${baseButtonStyle}
  color: ${white};
  background-color: ${errorColor};
  :focus,
  :hover {
    background-color: ${errorColor}a6;
  }
`
