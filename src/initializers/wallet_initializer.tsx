import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect } from 'react'
import { injected, isMetaMaskInstalled, useMetamask } from 'src/external'
import { useWalletStore } from 'src/stores'

/**
 * Wallet周りの初期化処理を保有するWrapper
 *
 * recoil state, Wallet接続からのeventをwatchして必要なside effectを管理する
 */
export const WalletInitializer: React.FC = ({ children }) => {
  const { activate } = useWeb3React()
  const { disconnect } = useMetamask()
  const { active, activateWallet, metamaskSigner } = useWalletStore()

  /**
   * event handling methods
   * - chainChanged
   * - accountsChanged
   *
   * ref: https://github.com/Uniswap/uniswap-interface/blob/main/src/hooks/web3.ts
   */
  /** for chainChanged event */
  const handleChainChanged = useCallback(() => {
    activate(injected, undefined, true).catch((error) => {
      console.error('Failed to activate after chain changed', error)
    })
  }, [activate])
  /** for accountsChanged event */
  const handleAccountsChanged = useCallback(
    (accounts: string[]) => {
      // account切り替え時に、切り替えられたaccountを有効化する
      // account接続解除またはlockにより、残りの接続済みaccountがゼロになった場合、Metamask自体との接続を切断したと認識させる
      if (accounts.length > 0) {
        activate(injected, undefined, true).catch((error) => {
          console.error('Failed to activate after accounts changed', error)
        })
      } else {
        disconnect()
      }
    },
    [activate, disconnect],
  )

  /**
   * Control event handlers
   *
   * use useEffect
   */
  useEffect(() => {
    const { ethereum } = window
    if (ethereum && isMetaMaskInstalled() && metamaskSigner !== null) {
      // reset event handlers (set hooks with latest parameters/fields)
      ethereum.removeAllListeners('chainChanged')
      ethereum.removeAllListeners('accountsChanged')
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
    }

    return () => {
      if (ethereum && ethereum.removeListener) {
        // remove all event handlers
        ethereum.removeAllListeners('chainChanged')
        ethereum.removeAllListeners('accountsChanged')
      }
    }
  }, [handleAccountsChanged, handleChainChanged, metamaskSigner])

  /**
   * eager connect
   *
   * use useEffect
   * use Metamask when browser reloading if now connecting Metamask
   */
  useEffect(() => {
    if (!active) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true)
            .then(() => activateWallet('Metamask'))
            .catch((error) =>
              console.log('Error by trying to connect MetaMask'),
            )
        }
      })
    }
  }, [activate, activateWallet, active])

  return <>{children}</>
}
