import { useCallback } from 'react'
import { useContractStore, useWalletStore } from 'src/stores'

export function useExternal() {
  const { disconnect: disconnectWallet } = useWalletStore()
  const { disconnect: disconnectContract } = useContractStore()

  const disconnect = useCallback(() => {
    disconnectWallet()
    disconnectContract()
  }, [disconnectWallet, disconnectContract])

  return {
    disconnect,
  }
}
