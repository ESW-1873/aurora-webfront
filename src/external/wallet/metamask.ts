import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useWalletStore } from 'src/stores'

// https://stackoverflow.com/questions/65504958/web3-js-extending-the-window-interface-type-definitions
declare global {
  interface Window {
    ethereum: any
  }
}

const isMetaMaskInstalled = (): boolean => {
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

export function useMetamask() {
  const { connect: connectWallet } = useWalletStore()

  const connect = useCallback(
    async ({ address }: { address?: string }) => {
      if (isMetaMaskInstalled()) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const signer = connectWallet({
          web3Provider: new ethers.providers.Web3Provider(window.ethereum),
          address: address,
        })
        return signer
      } else {
        console.error('Please make Metamask available')
        return null
      }
    },
    [connectWallet],
  )

  return connect
}
