import { UnsupportedChainIdError } from '@web3-react/core'
import React, { VFC } from 'react'
import {
  IconBack,
  IconLoading,
  IconMetamask,
  IconWalletConnect,
} from 'src/assets/svgs'
import { useMetamask } from 'src/external/wallet/metamask'
import { useWalletConnect } from 'src/external/wallet/wallet_connect'
import { useWalletModalStore, WalletType } from 'src/stores'
import { darkpurple, errorColor, gray, purple, white } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
// import { CtaButton } from '../../Buttons'

/**
 * only from SelectWalletModal
 */

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
        <Title>Connect Wallet</Title>
        {!errors ? (
          <LoadingDiv>
            <LoadingContentsArea>
              <IconLoading />
              <Label>Initializing...</Label>
            </LoadingContentsArea>
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
          <ContentsArea>
            <div>
              <Label>{selectedWalletType}</Label>
              <WalletDescription>
                {selectedWalletType === 'Metamask' &&
                  'Easy-to-use browser extension.'}
                {selectedWalletType === 'WalletConnect' &&
                  'Connect to Trust Wallet, Rainbow Wallet and more…'}
              </WalletDescription>
            </div>
            {selectedWalletType === 'Metamask' && <IconMetamask />}
            {selectedWalletType === 'WalletConnect' && <IconWalletConnect />}
          </ContentsArea>
        </WalletDiv>
      </Layout>
    </>
  )
}

const Layout = styled.div`
  max-width: 268px;
  margin: 0 auto;
  @media ${breakpoint.s} {
    padding-top: 16px;
  }
`

const Title = styled.h3`
  font-size: 32px;
  font-weight: ${fontWeightBold};
  line-height: calc(40 / 32);
  text-align: center;
  margin-bottom: 24px;
`

const Label = styled.span`
  line-height: 1.25;
  display: inline-flex;
`

const WalletDescription = styled.p`
  font-size: 10px;
  letter-spacing: 0.012em;
  margin-top: 5px;
`

const ContentsArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: ${fontWeightMedium};
  > div {
    margin-right: 8px;
  }
  > svg {
    height: 100%;
    width: 32px;
  }
`

const LoadingContentsArea = styled(ContentsArea)`
  justify-content: start;
  > svg {
    margin-right: 8px;
  }
`

const WalletDiv = styled.div`
  position: relative;
  width: 100%;
  padding: 14px 24px;
  min-height: 64px;
  color: ${white};
  background: ${purple};
  border-radius: 16px;
  :not(:last-child) {
    margin-bottom: 24px;
  }
`

const StyledIconBack = styled(IconBack)`
  position: absolute;
  top: 24px;
  left: 24px;
  cursor: pointer;
`
const LoadingDiv = styled(WalletDiv)`
  display: flex;
  align-items: center;
  background: unset;
  backdrop-filter: blur(30px) brightness(110%);
  background: ${white}0d;
  color: ${darkpurple};
`

const ErrorDiv = styled(WalletDiv)`
  background: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${errorColor};
  padding-right: 16px;
  > span {
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
  :hover {
    background: ${gray}7d;
  }
`
