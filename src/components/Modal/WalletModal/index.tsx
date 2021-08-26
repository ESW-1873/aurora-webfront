import React, { VFC } from 'react'
import { useWalletModalStore, useWalletStore } from 'src/stores'
import { Modal } from '..'
import { AddressInfo } from './AddressInfo'
import { SelectWallet } from './SelectWallet'
import { WalletError } from './WalletError'

export const WalletModal: VFC = () => {
  const { account, error } = useWalletStore()
  const { isOpen, close } = useWalletModalStore()

  const getWalletModalContent = () => {
    if (error) {
      return <WalletError error={error} />
    }
    if (account) {
      return <AddressInfo address={account} />
    }
    return <SelectWallet />
  }
  return (
    <Modal isOpen={isOpen} closeModal={close}>
      {getWalletModalContent()}
    </Modal>
  )
}
