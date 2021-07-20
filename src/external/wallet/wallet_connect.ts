import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import { useCallback, useState } from 'react'

export function useWalletConnect() {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null)
  const [balance, setBalance] = useState<ethers.BigNumber | undefined>(
    undefined,
  )
  const [transactionCount, setTransactionCount] = useState<number | undefined>(
    undefined,
  )

  const connectWalletConnect = useCallback(async () => {
    const provider = new WalletConnectProvider({
      infuraId: '5b086d843739469d8df05dae6fcde6d0', // TODO: need infuraId or rpc
    })
    await provider.enable()
    setProvider(new ethers.providers.Web3Provider(provider))
  }, [])

  const getBalance = useCallback(
    async ({ address }: { address: string }) => {
      setBalance(await provider?.getBalance(address))
    },
    [provider],
  )

  const getTransactionCount = useCallback(
    async ({ address }: { address: string }) => {
      setTransactionCount(await provider?.getTransactionCount(address))
    },
    [provider],
  )

  return {
    provider,
    connectWalletConnect,
    balance,
    transactionCount,
    getBalance,
    getTransactionCount,
  }
}
