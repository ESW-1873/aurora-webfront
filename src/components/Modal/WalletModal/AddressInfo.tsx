import { useWeb3React } from '@web3-react/core'
import React, { useState, VFC } from 'react'
import {
  IconCheck,
  IconColorfulCircle,
  IconCopy,
  IconExternalLink,
} from 'src/assets/svgs'
import { CHAIN_INFO, SupportedChainId } from 'src/constants/chains'
import { useWalletConnect } from 'src/external'
import { useWalletModalStore, useWalletStore } from 'src/stores'
import { primaryColor, white } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { defaultShadow, flexCenter } from 'src/styles/mixins'
import { shortenAddress } from 'src/utils/address'
import styled from 'styled-components'
import { Heading, SubHeading } from '../common'
import { SelectWallet } from './SelectWallet'

export const AddressInfo: VFC<{
  address: string
}> = ({ address }) => {
  const { close } = useWalletModalStore()
  const [changingWallet, setChangingWallet] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const backToAddressInfo = (): void => setChangingWallet(false)
  const onClickCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(address)
    setTimeout(() => setIsCopied(false), 500)
  }

  const { disconnect } = useWalletConnect()
  const { activeWalletType } = useWalletStore()

  const { chainId } = useWeb3React()
  const { explorer } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET]

  return (
    <>
      {changingWallet ? (
        <SelectWallet onBack={backToAddressInfo} />
      ) : (
        <>
          <Layout>
            <Heading>Your Account</Heading>
            <SubHeading>{`Connected with ${activeWalletType}`}</SubHeading>
            <AddressLabelDiv>
              <IconColorfulCircle />
              <span>{shortenAddress(address)}</span>
            </AddressLabelDiv>
            <ActionAreaDiv>
              <div onClick={onClickCopy}>
                {isCopied ? <IconCheck /> : <IconCopy />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </div>
              <a
                href={`${explorer}address/${address}`}
                target="_blank"
                rel="noreferrer"
              >
                <IconExternalLink />
                <span>Explorer</span>
              </a>
            </ActionAreaDiv>
            <ButtonAreaDiv>
              {activeWalletType == 'WalletConnect' && (
                <StyledCtaButton
                  onClick={async () => {
                    await disconnect()
                    close()
                  }}
                >
                  Disconnect
                </StyledCtaButton>
              )}
              <StyledCtaButton onClick={() => setChangingWallet(true)}>
                Change
              </StyledCtaButton>
            </ButtonAreaDiv>
          </Layout>
        </>
      )}
    </>
  )
}

const StyledCtaButton = styled.button`
  ${flexCenter};
  padding: 0 24px;
  max-width: 96px;
  height: 32px;
  font-size: 12px;
  letter-spacing: 0.016em;
  font-weight: ${fontWeightMedium};
  text-align: center;
  background: ${white};
  border-radius: 16px;
  border: 1px solid ${primaryColor};
  box-shadow: ${defaultShadow};
`

const ButtonAreaDiv = styled.div`
  ${flexCenter};
  > button:nth-child(2n) {
    margin-left: 12px;
  }
`

const ActionAreaDiv = styled.div`
  ${flexCenter};
  > div,
  a {
    display: flex;
    align-items: center;
  }
  > div {
    cursor: pointer;
    margin-right: 16px;
    min-width: 88px;
  }
  span {
    margin-left: 8px;
    font-size: 14px;
  }
`

const AddressLabelDiv = styled.div`
  ${flexCenter};
  font-size: 20px;
  font-weight: ${fontWeightMedium};
  line-height: calc(20 / 25);
  > span {
    margin-left: 12px;
  }
`

const Layout = styled.div`
  ${Heading} {
    margin-bottom: 24px;
  }
  ${SubHeading} {
    opacity: 0.5;
    margin-bottom: 16px;
  }
  ${AddressLabelDiv} {
    margin-bottom: 12px;
  }
  ${ActionAreaDiv} {
    margin-bottom: 16px;
  }
`
