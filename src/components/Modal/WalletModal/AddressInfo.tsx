import React, { useState, VFC } from 'react'
import {
  IconCheck,
  IconColorfulCircle,
  IconCopy,
  IconExternalLink,
} from 'src/assets/svgs'
import { useWalletConnect } from 'src/external'
import { useWalletModalStore, useWalletStore } from 'src/stores'
import { black, darkpurple, white } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { shortenAddress } from 'src/utils/address'
import { ETHERSCAN_URL } from 'src/utils/router'
import styled from 'styled-components'
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

  return (
    <>
      {changingWallet ? (
        <SelectWallet onBack={backToAddressInfo} />
      ) : (
        <>
          <Title>Your Account</Title>
          <AddressInfoLayout>
            <SubTitle>{`Connected with ${activeWalletType}`}</SubTitle>
            <AddressInfoDiv>
              <IconColorfulCircle />
              <AddressLabel>{shortenAddress(address)}</AddressLabel>
            </AddressInfoDiv>
            <ActionAreaDiv>
              <div onClick={onClickCopy}>
                {isCopied ? <IconCheck /> : <IconCopy />}
                <ActionLabel>{isCopied ? 'Copied!' : 'Copy'}</ActionLabel>
              </div>
              <a
                href={`${ETHERSCAN_URL}/address/${address}`}
                target="_blank"
                rel="noreferrer"
              >
                <IconExternalLink />
                <ActionLabel>Explorer</ActionLabel>
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
          </AddressInfoLayout>
        </>
      )}
    </>
  )
}

const StyledCtaButton = styled.button`
  ${flexCenter};
  max-width: 96px;
  height: 32px;
  border-radius: 16px;
  background: ${white};
  border: 1px solid ${darkpurple};
  box-shadow: 0 3px 2px ${black}80;
  padding: 0 24px;
  text-align: center;
  font-size: 12px;
  font-weight: ${fontWeightMedium};
  letter-spacing: 0.016em;
`

const ActionLabel = styled.span`
  margin-left: 8px;
  font-size: 14px;
`

const ButtonAreaDiv = styled.div`
  ${flexCenter};
  > button:nth-child(2n) {
    margin-left: 12px;
  }
`

const ActionAreaDiv = styled.div`
  ${flexCenter};
  margin-bottom: 18px;
  > div,
  a {
    display: flex;
    align-items: center;
  }
  > div {
    cursor: pointer;
    margin-right: 16px;
    min-width: 87px;
  }
`

const AddressInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h3`
  font-size: 32px;
  font-weight: ${fontWeightBold};
  line-height: calc(41 / 32);
  text-align: center;
  margin-bottom: 16px;
`

const SubTitle = styled.p`
  width: 100%;
  font-weight: ${fontWeightMedium};
  line-height: calc(20 / 16);
  text-align: center;
  opacity: 0.5;
  margin-bottom: 16px;
`

const AddressInfoDiv = styled.div`
  ${flexCenter};
  margin-bottom: 16px;
`

const AddressLabel = styled.span`
  font-size: 20px;
  font-weight: ${fontWeightMedium};
  line-height: calc(20 / 25);
  margin-left: 12px;
`
