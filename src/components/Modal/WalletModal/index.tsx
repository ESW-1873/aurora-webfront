import { useWeb3React } from '@web3-react/core'
import React, { VFC } from 'react'
import { useWalletModalStore } from 'src/stores'
import { Modal } from '..'
import { AddressInfo } from './AddressInfo'
import { SelectWallet } from './SelectWallet'
import { WalletError } from './WalletError'

export const WalletModal: VFC = () => {
  const { account, error } = useWeb3React()
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
