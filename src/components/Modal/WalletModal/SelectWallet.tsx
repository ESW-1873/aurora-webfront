import { UnsupportedChainIdError } from '@web3-react/core'
import React, { useState, VFC } from 'react'
import { isMobile } from 'react-device-detect'
import { IconBack } from 'src/assets/svgs'
import { NotAuditedCaution } from 'src/components/Caution'
import { Wallet } from 'src/components/Wallet'
import { useMetamask, useWalletConnect } from 'src/external'
import { isMetaMaskInstalled } from 'src/external/wallet/metamask'
import { useWalletModalStore, useWalletStore, WalletType } from 'src/stores'
import { METAMASK_URL } from 'src/utils/router'
import styled from 'styled-components'
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
    useState<WalletType>('Metamask')

  const cancelConnecting = () => {
    setErrors(undefined)
    setConnecting(false)
  }

  return (
    <>
      {connecting ? (
        <ConnectingWallet
          onBack={cancelConnecting}
          errors={errors}
          setErrors={setErrors}
          selectedWalletType={selectedWalletTypeState}
        />
      ) : (
        <>
          {onBack && <StyledIconBack onClick={() => onBack()} />}
          <div>
            <NotAuditedCaution />
            {!isMobile && (
              <Wallet
                label={isMetaMaskInstalled() ? 'Metamask' : 'Install Metamask'}
                onClick={
                  isMetaMaskInstalled()
                    ? activeWalletType === 'Metamask' && onBack
                      ? () => onBack()
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
                isConnected={activeWalletType === 'Metamask'}
              />
            )}
            <Wallet
              label="WalletConnect"
              onClick={
                activeWalletType === 'WalletConnect' && onBack
                  ? () => onBack()
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
              isConnected={activeWalletType === 'WalletConnect'}
            />
          </div>
        </>
      )}
    </>
  )
}

const StyledIconBack = styled(IconBack)`
  position: absolute;
  top: 24px;
  left: 24px;
  cursor: pointer;
`
