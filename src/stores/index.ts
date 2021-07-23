import { ethers } from 'ethers'
import { useCallback } from 'react'
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { HologramRelation } from 'src/external/contract'
import { HologramRelation__factory } from 'src/external/contract/types'

// for Wallet

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

export function useWalletStore(): {
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
          ? web3Provider.getSigner() // select first account
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

// for Contract

const CONTRACT_ADDRESS = '0xeB7807D5E5dCE78208Fa2B1eF46Fe220B53E29Ee' // TODO: need contract address

/// an abstraction of code that has been deployed to the blockchain
const contractAtom = atom<HologramRelation | null>({
  key: 'contract',
  default: null,
  dangerouslyAllowMutability: true, // for skipping deep freeze
})

export function useContractStore() {
  const contractState = useRecoilValue(contractAtom)
  const setContractState = useSetRecoilState(contractAtom)
  const resetContractState = useResetRecoilState(contractAtom)
  const signer = useRecoilValue(signerAtom)

  function getContract(): HologramRelation | null {
    if (contractState !== null) {
      return contractState
    } else {
      if (signer !== null) {
        const newContract = HologramRelation__factory.connect(
          CONTRACT_ADDRESS,
          signer,
        )
        setContractState(newContract)
        return newContract
      } else {
        return null
      }
    }
  }

  const disconnect = useCallback(() => {
    resetContractState()
  }, [resetContractState])

  return {
    contract: getContract(),
    disconnect,
  }
}
