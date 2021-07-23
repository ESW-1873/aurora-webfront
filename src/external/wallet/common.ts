import { useCallback } from 'react'
import { useWalletStore } from 'src/stores'

export function useWallet() {
  const { disconnect: disconnectWallet } = useWalletStore()

  const disconnect = useCallback(() => {
    disconnectWallet()
  }, [disconnectWallet])

  return {
    disconnect,
  }
}
