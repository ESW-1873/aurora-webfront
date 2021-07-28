import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useWalletStore } from 'src/stores'

/**
 * metamask向けの型拡張
 *
 * https://stackoverflow.com/questions/65504958/web3-js-extending-the-window-interface-type-definitions
 */
declare global {
  interface Window {
    ethereum: any
  }
}

/**
 * 利用しているbrowserでMetamaskが利用可能か
 * @returns {boolean}
 */
const isMetaMaskInstalled = (): boolean => {
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

/**
 * Metamaskを利用するためのhooks
 */
export const useMetamask = () => {
  const { connect: connectWallet } = useWalletStore()

  /**
   * Metamaskを利用したWallet接続
   *
   * @param {string} address
   * @return {(Signer|null)} Signer when successful connection, null when existing error etc
   */
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
