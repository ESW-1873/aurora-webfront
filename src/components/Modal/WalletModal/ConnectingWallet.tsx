import { UnsupportedChainIdError } from '@web3-react/core'
import React, { VFC } from 'react'
import { IconLoading, IconMetamask, IconWalletConnect } from 'src/assets/svgs'
import {
  METAMASK_DESCRIPTION,
  WALLET_CONNECT_DESCRIPTION,
} from 'src/constants/misc'
import { useMetamask } from 'src/external/wallet/metamask'
import { useWalletConnect } from 'src/external/wallet/wallet_connect'
import { useWalletModalStore, WalletType } from 'src/stores'
import {
  errorColor,
  gray,
  primaryColor,
  purple,
  white,
} from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled, { css } from 'styled-components'
import { Heading, StyledIconBack } from '../common'

export const ConnectingWallet: VFC<{
  onBack: () => void
  errors: any
  setErrors: (err: any) => void
  selectedWalletType: WalletType
}> = ({ onBack, errors, setErrors, selectedWalletType }) => {
  const { close } = useWalletModalStore()
  const { connect: connectMetamask } = useMetamask()
  const { connect: connectWalletConnect } = useWalletConnect()

  return (
    <>
      <StyledIconBack onClick={onBack} />
      <Layout>
        <Heading>Connect Wallet</Heading>
        {!errors ? (
          <LoadingDiv>
            <IconLoading />
            <Label>Initializing...</Label>
          </LoadingDiv>
        ) : (
          <ErrorDiv>
            <Label>Connection Error</Label>
            <RetryButton
              onClick={async () => {
                setErrors(undefined)
                try {
                  if (selectedWalletType === 'Metamask') {
                    await connectMetamask()
                  } else {
                    await connectWalletConnect()
                  }
                  close()
                } catch (err: any) {
                  if (err instanceof UnsupportedChainIdError) {
                    close()
                  } else {
                    setErrors(err)
                  }
                }
              }}
            >
              Try Again
            </RetryButton>
          </ErrorDiv>
        )}
        <WalletDiv>
          <div>
            <Label>{selectedWalletType}</Label>
            <SmallLabel>
              {selectedWalletType === 'Metamask' && METAMASK_DESCRIPTION}
              {selectedWalletType === 'WalletConnect' &&
                WALLET_CONNECT_DESCRIPTION}
            </SmallLabel>
          </div>
          {selectedWalletType === 'Metamask' && <IconMetamask />}
          {selectedWalletType === 'WalletConnect' && <IconWalletConnect />}
        </WalletDiv>
      </Layout>
    </>
  )
}

const Layout = styled.div`
  > div {
    max-width: 262px;
    margin: 0 auto;
  }
  ${Heading} {
    margin-bottom: 16px;
  }
  @media ${breakpoint.s} {
    ${Heading} {
      padding: 16px 32px 0;
    }
  }
`

const Label = styled.span`
  line-height: 1.25;
`

const SmallLabel = styled.p`
  font-size: 10px;
  letter-spacing: 0.012em;
  margin-top: 5px;
`

const baseDivStyle = css`
  min-height: 64px;
  border-radius: 16px;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > svg {
    height: 100%;
    width: 32px;
  }
  :not(:last-child) {
    margin-bottom: 18px;
  }
`

const WalletDiv = styled.div`
  ${baseDivStyle}
  color: ${white};
  background: ${purple};
  font-weight: ${fontWeightMedium};
  > div {
    margin-right: 8px;
  }
`

const LoadingDiv = styled.div`
  ${baseDivStyle}
  justify-content: start;
  color: ${primaryColor};
  background: ${white}0d;
  backdrop-filter: blur(30px) brightness(110%);
  > svg {
    margin-right: 8px;
  }
`

const ErrorDiv = styled.div`
  ${baseDivStyle}
  border: 1px solid ${errorColor};
  padding-right: 16px;
  ${Label} {
    color: ${errorColor};
    margin-right: 8px;
  }
`

const RetryButton = styled.button`
  width: 96px;
  height: 32px;
  border-radius: 16px;
  text-align: center;
  font-size: 12px;
  font-weight: ${fontWeightMedium};
  letter-spacing: 0.016em;
  background: ${gray};
  color: ${white};
  :hover {
    background: ${gray}7d;
  }
`
