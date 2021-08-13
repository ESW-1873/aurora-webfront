import { UnsupportedChainIdError } from '@web3-react/core'
import React, { VFC } from 'react'
import {
  IconBack,
  IconLoading,
  IconMetamask,
  IconWalletConnect,
} from 'src/assets/svgs'
import { NotAuditedCaution } from 'src/components/Caution'
import { useMetamask } from 'src/external/wallet/metamask'
import { useWalletConnect } from 'src/external/wallet/wallet_connect'
import { useWalletModalStore, WalletType } from 'src/stores'
import { errorColor, primaryGradient, white } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { absoluteFill } from 'src/styles/mixins'
import styled from 'styled-components'
import { CtaButton } from '../../Buttons'

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
      <div>
        <NotAuditedCaution />
        {!errors ? (
          <LoadingDiv>
            <LoadingAreaBack />
            <LoadingAreaFront />
            <LoadingContentsArea>
              <IconLoading />
              <Label>Initializing...</Label>
            </LoadingContentsArea>
          </LoadingDiv>
        ) : (
          <ErrorDiv>
            <Label>Connection Error</Label>
            <StyledCtaButton
              label="Try Again"
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
            />
          </ErrorDiv>
        )}
        <WalletDiv>
          <WalletAreaBack />
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
      </div>
    </>
  )
}

const Label = styled.span`
  line-height: 1.25;
  display: inline-flex;
`

const WalletDescription = styled.p`
  font-size: 10px;
  letter-spacing: 0.012em;
  margin-top: 5px;
`

const WalletAreaBack = styled.div`
  ${absoluteFill};
  backdrop-filter: blur(30px) brightness(110%);
  background: ${white}0d;
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
  > div {
    border-radius: 16px;
  }
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
`
const LoadingAreaBack = styled(WalletAreaBack)`
  ${absoluteFill};
  background: ${primaryGradient};
  opacity: 0.25;
`
const LoadingAreaFront = styled.div`
  ${absoluteFill};
  backdrop-filter: blur(30px) brightness(110%);
  background: ${white}0d;
`

const ErrorDiv = styled(WalletDiv)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${errorColor};
  border-radius: 16px;
  padding-right: 16px;
  > span {
    color: ${errorColor};
    margin-right: 8px;
  }
`
const StyledCtaButton = styled(CtaButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: unset;
  background: ${white}50;
  > span {
    font-size: 12px;
  }
`
