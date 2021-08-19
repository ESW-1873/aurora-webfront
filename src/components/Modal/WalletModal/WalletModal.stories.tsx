import { UnsupportedChainIdError } from '@web3-react/core'
import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { ZERO_ADDRESS } from 'src/constants/misc'
import { isOpenedWalletModalAtom } from 'src/stores/Modal/walletModal'
import { Modal } from '..'
import { AddressInfo } from './AddressInfo'
import { ConnectingWallet } from './ConnectingWallet'
import { SelectWallet } from './SelectWallet'
import { WalletError } from './WalletError'

export default {
  title: 'WalletModal',
  decorators: [
    (Story: VFC) => (
      <RecoilRoot
        initializeState={(snap) => snap.set(isOpenedWalletModalAtom, true)}
      >
        <Modal isOpen={true} closeModal={() => {}}>
          <Story />
        </Modal>
      </RecoilRoot>
    ),
  ],
}

export const SelectWalletModalPage = () => <SelectWallet />

export const AddressInfoModalPage = () => <AddressInfo address={ZERO_ADDRESS} />

export const NetworkErrorModalPage = () => (
  <WalletError error={new UnsupportedChainIdError(3)} />
)

export const UnknownErrorModalPage = () => <WalletError error={Error()} />

export const ConnectingModalPage = () => (
  <ConnectingWallet
    onBack={() => {}}
    errors={null}
    setErrors={() => {}}
    selectedWalletType={'Metamask'}
  />
)

export const ConnectingErrorModalPage = () => (
  <ConnectingWallet
    onBack={() => {}}
    errors={'error'}
    setErrors={() => {}}
    selectedWalletType={'Metamask'}
  />
)
