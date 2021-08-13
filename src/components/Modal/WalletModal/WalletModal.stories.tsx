import { UnsupportedChainIdError } from '@web3-react/core'
import React, { ReactNode, VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { ZERO_ADDRESS } from 'src/constants/misc'
import { isOpenedWalletModalAtom } from 'src/stores/Modal/walletModal'
import { GlobalStyles } from 'src/styles/global-styles'
import { Modal } from '..'
import { AddressInfo } from './AddressInfo'
import { ConnectingWallet } from './ConnectingWallet'
import { SelectWallet } from './SelectWallet'
import { WalletError } from './WalletError'

export default {
  title: 'WalletModal',
}

const WalletModalWrapper: VFC<{ children: ReactNode }> = ({ children }) => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedWalletModalAtom, true)}
  >
    <GlobalStyles />
    <Modal isOpen={true} closeModal={() => {}}>
      {children}
    </Modal>
  </RecoilRoot>
)

export const SelectWalletModalPage = () => (
  <WalletModalWrapper>
    <SelectWallet />
  </WalletModalWrapper>
)

export const AddressInfoModalPage = () => (
  <WalletModalWrapper>
    <AddressInfo address={ZERO_ADDRESS} />
  </WalletModalWrapper>
)

export const NetworkErrorModalPage = () => (
  <WalletModalWrapper>
    <WalletError error={new UnsupportedChainIdError(3)} />
  </WalletModalWrapper>
)

export const UnknownErrorModalPage = () => (
  <WalletModalWrapper>
    <WalletError error={Error()} />
  </WalletModalWrapper>
)

export const ConnectingModalPage = () => (
  <WalletModalWrapper>
    <ConnectingWallet
      onBack={() => {}}
      errors={null}
      setErrors={() => {}}
      selectedWalletType={'Metamask'}
    />
  </WalletModalWrapper>
)

export const ConnectingErrorModalPage = () => (
  <WalletModalWrapper>
    <ConnectingWallet
      onBack={() => {}}
      errors={'error'}
      setErrors={() => {}}
      selectedWalletType={'Metamask'}
    />
  </WalletModalWrapper>
)
