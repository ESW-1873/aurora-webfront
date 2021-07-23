import { ethers } from 'ethers'
import { useCallback, useState } from 'react'

/// read-only abstraction to access the blockchain data
/// support only Web3Provider
/*
const providerAtom = atom<ethers.providers.Web3Provider | null>({
  key: 'provider',
  default: null,
})
*/

/*
/// a simple Signer provided by Web3Provider
const signerAtom = atom<ethers.providers.JsonRpcSigner | null>({
  key: 'signer',
  default: null,
})
*/

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
  // 現状 ethers.providers.Web3Provider, JsonRpcSigner は freezeできないObject であり、useSetRecoilState()を利用するとerrorが出る
  // https://github.com/facebookexperimental/Recoil/blob/c4b26720769c7475f6f6878a3b40c6f1be51eef6/src/util/Recoil_deepFreezeValue.js
  const [_, setProvider] = useState<ethers.providers.Web3Provider | null>(null) // TODO: use Recoil
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null,
  ) // TODO: use Recoil

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
    setProvider(null) // resetProvider()
    setSigner(null) // resetSigner()
  }, [setProvider, setSigner])

  return {
    currentSigner: signer, // useRecoilValue(signerAtom)
    connect,
    disconnect,
  }
}
