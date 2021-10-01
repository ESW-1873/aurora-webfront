import { UnsupportedChainIdError } from '@web3-react/core'
import React, { VFC } from 'react'
import { HeaderButton } from 'src/components/Buttons/HeaderButton'
import { Logo } from 'src/components/Logo'
import { Link } from 'src/elements/Link'
import { useWalletModalStore, useWalletStore } from 'src/stores'
import { shortenAddress } from 'src/utils/address'
import { ABOUT } from 'src/utils/router'
import styled from 'styled-components'

export const Header: VFC = () => {
  const { account, error } = useWalletStore()
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError
  const { open: openWalletModal } = useWalletModalStore()
  return (
    <>
      <HeaderLayout>
        <Link href={ABOUT}>
          <Logo />
        </Link>
        {isUnsupportedChainIdError ? (
          <HeaderButton
            hasError
            label="Wrong Network"
            onClick={openWalletModal}
          />
        ) : account ? (
          <HeaderButton
            hasAccount
            label={shortenAddress(account)}
            onClick={openWalletModal}
          />
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
