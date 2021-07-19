import { ethers } from 'ethers'
import { useCallback, useState } from 'react'

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
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null)
  const [balance, setBalance] = useState<ethers.BigNumber | undefined>(
    undefined,
  )
  const [transactionCount, setTransactionCount] = useState<number | undefined>(
    undefined,
  )

  const connectMetamask = useCallback(async () => {
    if (!isMetaMaskInstalled) setProvider(null)
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    setProvider(new ethers.providers.Web3Provider(window.ethereum))
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
    connectMetamask,
    balance,
    transactionCount,
    getBalance,
    getTransactionCount,
  }
}
