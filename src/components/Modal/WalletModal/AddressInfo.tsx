import React, { useState, VFC } from 'react'
import {
  IconCheck,
  IconColorfulCircle,
  IconCopy,
  IconExternalLink,
} from 'src/assets/svgs'
import { Button } from 'src/components/Buttons'
import { useWalletConnect } from 'src/external'
import { useWalletModalStore, useWalletStore } from 'src/stores'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
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
            <div>
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
            </div>
            <ButtonAreaDiv>
              {activeWalletType == 'WalletConnect' && (
                <StyledCtaButton
                  label="Disconnect"
                  onClick={async () => {
                    await disconnect()
                    close()
                  }}
                />
              )}
              <StyledCtaButton
                label="Change"
                onClick={() => setChangingWallet(true)}
              />
            </ButtonAreaDiv>
          </AddressInfoLayout>
        </>
      )}
    </>
  )
}
const StyledCtaButton = styled(Button)`
  max-width: 96px;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    font-size: 12px;
  }
  :first-child {
    margin-bottom: 8px;
    @media ${breakpoint.s} {
      margin-bottom: 0;
      margin-right: 10px;
    }
  }
`

const ActionLabel = styled.span`
  margin-left: 8px;
  font-size: 14px;
`

const ButtonAreaDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${breakpoint.s} {
    width: 100%;
    margin-top: 32px;
    flex-direction: row;
    justify-content: center;
  }
`

const ActionAreaDiv = styled.div`
  display: flex;
  align-items: center;
  padding-left: 6px;
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
  @media ${breakpoint.s} {
    justify-content: center;
  }
`

const AddressInfoLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${breakpoint.s} {
    flex-direction: column;
  }
`

const Title = styled.h3`
  font-size: 32px;
  font-weight: ${fontWeightBold};
  line-height: calc(41 / 32);
  text-align: center;
  margin-bottom: 32px;
`

const SubTitle = styled.p`
  font-weight: ${fontWeightMedium};
  line-height: calc(20 / 16);
  text-align: left;
  opacity: 0.5;
  margin-bottom: 18px;
  width: 100%;
`

const AddressInfoDiv = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  @media ${breakpoint.s} {
    justify-content: center;
  }
`

const AddressLabel = styled.span`
  font-size: 20px;
  font-weight: ${fontWeightMedium};
  line-height: calc(20 / 25);
  margin-left: 12px;
`
