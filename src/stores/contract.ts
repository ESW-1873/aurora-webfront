import { useCallback } from 'react'
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { HologramRelation } from 'src/external/contract'
import { HologramRelation__factory } from 'src/external/contract/types'
import { useWalletStore } from '.'

// for Contract
/** Contractのaddress */
const CONTRACT_ADDRESS = '0xeB7807D5E5dCE78208Fa2B1eF46Fe220B53E29Ee' // TODO: switch by environment selected (now, only Rinkeby)

/**
 * an abstraction of code that has been deployed to the blockchain
 *
 * use atom from recoil
 */
const contractAtom = atom<HologramRelation | null>({
  key: 'contract',
  default: null,
  dangerouslyAllowMutability: true, // for skipping deep freeze
})

/*
 * Contractに関連するデータのstate管理を行う
 */
export const useContractStore = () => {
  const { currentSigner } = useWalletStore()
  const contractState = useRecoilValue(contractAtom)
  const setContractState = useSetRecoilState(contractAtom)
  const resetContractState = useResetRecoilState(contractAtom)

  /**
   * get current contract
   *
   * if no contract, generate contract & store
   */
  function getContract(): HologramRelation | null {
    if (contractState !== null) {
      return contractState
    } else {
      if (currentSigner !== null) {
        const newContract = HologramRelation__factory.connect(
          CONTRACT_ADDRESS,
          currentSigner,
        )
        setContractState(newContract)
        return newContract
      } else {
        return null
      }
    }
  }

  /**
   * disconnect contract
   *
   * clear state for contract
   */
  const disconnect = useCallback(() => {
    resetContractState()
  }, [resetContractState])

  return {
    contract: getContract(),
    disconnect,
  }
}
