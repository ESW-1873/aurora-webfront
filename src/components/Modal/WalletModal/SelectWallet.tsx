import { UnsupportedChainIdError } from '@web3-react/core'
import React, { useState, VFC } from 'react'
import { isMobile } from 'react-device-detect'
import { WalletOption } from 'src/components/WalletOption'
import { useMetamask, useWalletConnect } from 'src/external'
import { isMetaMaskInstalled } from 'src/external/wallet/metamask'
import { useWalletModalStore, useWalletStore, WalletType } from 'src/stores'
import { METAMASK_URL } from 'src/utils/router'
import styled from 'styled-components'
import { Heading, StyledIconBack, SubHeading } from '../common'
import { ConnectingWallet } from './ConnectingWallet'

export const SelectWallet: VFC<{
  onBack?: () => void
}> = ({ onBack }) => {
  const { close } = useWalletModalStore()
  const { activeWalletType } = useWalletStore()
  const { connect: connectMetamask } = useMetamask()
  const { connect: connectWalletConnect } = useWalletConnect()

  const [connecting, setConnecting] = useState(false)
  const [errors, setErrors] = useState()
  const [selectedWalletTypeState, setSelectedWalletTypeState] =
    useState<WalletType>()

  const cancelConnecting = () => {
    setErrors(undefined)
    setSelectedWalletTypeState(undefined)
    setConnecting(false)
  }

  return (
    <>
      {connecting && selectedWalletTypeState ? (
        <ConnectingWallet
          onBack={cancelConnecting}
          errors={errors}
          setErrors={setErrors}
          selectedWalletType={selectedWalletTypeState}
        />
      ) : (
        <>
          {onBack && <StyledIconBack onClick={onBack} />}
          <Layout>
            <Heading>Connect Wallet</Heading>
            <SubHeading>To start using Aurora</SubHeading>
            {!isMobile && (
              <WalletOption
                label={isMetaMaskInstalled() ? 'Metamask' : 'Install Metamask'}
                onClick={
                  isMetaMaskInstalled()
                    ? activeWalletType === 'Metamask' && onBack
                      ? onBack
                      : async () => {
                          setSelectedWalletTypeState('Metamask')
                          setConnecting(true)
                          try {
                            await connectMetamask()
                            close()
                          } catch (err: any) {
                            if (err instanceof UnsupportedChainIdError) {
                              close()
                            } else {
                              setErrors(err)
                            }
                          }
                        }
                    : () => window.open(METAMASK_URL, '_blank')
                }
              />
            )}
            <WalletOption
              label="WalletConnect"
              onClick={
                activeWalletType === 'WalletConnect' && onBack
                  ? onBack
                  : async () => {
                      setSelectedWalletTypeState('WalletConnect')
                      setConnecting(true)
                      try {
                        await connectWalletConnect()
                        close()
                      } catch (err: any) {
                        if (err instanceof UnsupportedChainIdError) {
                          close()
                        } else {
                          setErrors(err)
                        }
                      }
                    }
              }
            />
          </Layout>
        </>
      )}
    </>
  )
}

const Layout = styled.div`
  ${Heading} {
    margin-bottom: 16px;
  }
  ${SubHeading} {
    margin-bottom: 40px;
  }
  button:not(:last-child) {
    margin-bottom: 24px;
  }
`
