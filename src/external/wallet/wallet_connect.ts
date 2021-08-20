import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  UserRejectedRequestError,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { useCallback } from 'react'
import { useWalletStore } from 'src/stores'
import { walletconnect } from './utils'

/**
 * WalletConnectを利用するためのhooks
 */
export const useWalletConnect = () => {
  const { activateWallet, disconnectWalletConnect } = useWalletStore()
  const { activate } = useWeb3React()

  /** 接続成功時処理 */
  const processConnected = useCallback(() => {
    console.log('connect wallet by WalletConnect')
    activateWallet('WalletConnect')
  }, [activateWallet])

  /**
   * WalletConnectを利用したWallet接続
   */
  const connect = useCallback(async () => {
    // Once the connector has been activated, the WalletConnect provider can be accessed under the .walletConnectProvider property.
    // https://github.com/NoahZinsmeister/web3-react/issues/124#issuecomment-817631654
    // https://github.com/Uniswap/uniswap-interface/blob/9b1ef415c607e8e07339337fd415e0ab32802621/src/components/WalletModal/index.tsx#L180-L182
    if (
      walletconnect &&
      walletconnect instanceof WalletConnectConnector &&
      walletconnect.walletConnectProvider?.wc?.uri
    ) {
      walletconnect.walletConnectProvider = undefined
    }

    // activation
    await activate(walletconnect, undefined, true)
      .then(processConnected)
      .catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          console.log(
            'UnsupportedChainIdError by trying to connect WalletConnect',
          )
          activate(walletconnect)
            .then(processConnected)
            .catch((error) => {
              console.log(
                `${error} by trying to connect WalletConnect in second time`,
              )
              throw error
            })
        } else if (error instanceof UserRejectedRequestError) {
          console.log('User close QR Modal.')
        } else {
          console.log(`${error} by trying to connect WalletConnect`)
        }
        throw error
      })
  }, [activate, processConnected])

  /**
   * WalletConnectのdisconnect
   *
   * @todo make singleton?
   */
  const disconnect = async () => {
    try {
      walletconnect.close()
      disconnectWalletConnect()
    } catch (e) {
      console.error(e)
    }
  }

  return { connect, disconnect }
}
