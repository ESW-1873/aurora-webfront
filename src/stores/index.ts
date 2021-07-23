import { ethers } from 'ethers'
import { useCallback } from 'react'
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'

/// read-only abstraction to access the blockchain data
/// support only Web3Provider
const providerAtom = atom<ethers.providers.Web3Provider | null>({
  key: 'provider',
  default: null,
  dangerouslyAllowMutability: true, // for skipping deep freeze
})

/// a simple Signer provided by Web3Provider
const signerAtom = atom<ethers.providers.JsonRpcSigner | null>({
  key: 'signer',
  default: null,
  dangerouslyAllowMutability: true, // for skipping deep freeze
})

export function useWallet(): {
  currentSigner: ethers.providers.JsonRpcSigner | null
  connect: ({
    web3Provider,
    address,
  }: {
    web3Provider: ethers.providers.Web3Provider
    address?: string
  }) => ethers.providers.JsonRpcSigner
  disconnect: () => void
} {
  const setProvider = useSetRecoilState(providerAtom)
  const resetProvider = useResetRecoilState(providerAtom)

  const setSigner = useSetRecoilState(signerAtom)
  const resetSigner = useResetRecoilState(signerAtom)

  const connect = useCallback(
    ({ web3Provider, address }): ethers.providers.JsonRpcSigner => {
      setProvider(web3Provider)
      const signer =
        typeof address !== 'string' || address === ''
          ? web3Provider.getSigner()
          : web3Provider.getSigner(address)
      setSigner(signer)
      return signer
    },
    [setProvider, setSigner],
  )

  const disconnect = useCallback(() => {
    resetProvider()
    resetSigner()
  }, [resetProvider, resetSigner])

  return {
    currentSigner: useRecoilValue(signerAtom),
    connect,
    disconnect,
  }
}
