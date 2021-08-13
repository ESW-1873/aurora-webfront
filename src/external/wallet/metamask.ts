import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { useWalletStore } from 'src/stores'
import { injected } from './utils'

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
export const isMetaMaskInstalled = (): boolean => {
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

/**
 * Metamaskを利用するためのhooks
 */
export const useMetamask = () => {
  const { activate, deactivate } = useWeb3React()
  const { activeWalletType, activateWallet, disconnectMetamask } =
    useWalletStore()

  /** Disconnect */
  const disconnect = useCallback(async () => {
    try {
      /**
       * 現在activeなwalletがMetamaskの場合は、deactivateする
       * memo: `injected.deactivate()`ではMetamaskの最後のアカウント切り替え(accountsChanged)で切断されない事象があった
       */
      if (activeWalletType === 'Metamask') {
        deactivate()
      }
      disconnectMetamask()
    } catch (e) {
      console.error(e)
    }
  }, [activeWalletType, deactivate, disconnectMetamask])

  /** 接続成功時処理 */
  const processConnected = useCallback(() => {
    console.log('connect wallet by MetaMask')
    activateWallet('Metamask')
  }, [activateWallet])

  /** Connect */
  const connect = useCallback(async () => {
    if (isMetaMaskInstalled()) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      // activation
      await activate(injected, undefined, true)
        .then(processConnected)
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            console.log('UnsupportedChainIdError by trying to connect MetaMask')
            activate(injected)
              .then(processConnected)
              .catch((error) => {
                console.log(
                  `${error} by trying to connect MetaMask in second time`,
                )
                throw error
              })
          } else {
            console.log('Error by trying to connect MetaMask')
          }
          throw error
        })
    } else {
      console.error('Please make Metamask available')
    }
  }, [activate, processConnected])

  return {
    connect,
    disconnect,
  }
}
