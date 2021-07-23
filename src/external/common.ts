import { useCallback } from 'react'
import { useContractStore, useWalletStore } from 'src/stores'

/**
 * Wallet/Contract横断処理を利用するためのhooks
 */
export function useExternal() {
  const { disconnect: disconnectWallet } = useWalletStore()
  const { disconnect: disconnectContract } = useContractStore()

  /** disconnect Wallet/Contract */
  const disconnect = useCallback(() => {
    disconnectWallet()
    disconnectContract()
  }, [disconnectWallet, disconnectContract])

  return {
    disconnect,
  }
}
