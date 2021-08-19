import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { CONTRACT_ADDRESS } from 'src/constants/address'
import { SupportedChainId } from 'src/constants/chains'
import { PostManager, PostManager__factory } from 'src/external/contract/types'
import { isProd } from 'src/utils/env'
import { useWalletStore } from '.'

/**
 * an abstraction of code that has been deployed to the blockchain
 *
 * use atom from recoil
 */
const contractAtom = atom<PostManager | null>({
  key: 'contract',
  default: null,
  dangerouslyAllowMutability: true, // for skipping deep freeze
})

/*
 * Contractに関連するデータのstate管理を行う
 */
export const useContractStore = () => {
  const { chainId } = useWeb3React()
  const { currentSigner } = useWalletStore()
  const contractState = useRecoilValue(contractAtom)
  const setContractState = useSetRecoilState(contractAtom)
  const resetContractState = useResetRecoilState(contractAtom)

  /**
   * get current contract
   *
   * if no contract, generate contract & store
   */
  function getContract(): PostManager | null {
    if (contractState !== null) {
      return contractState
    } else {
      if (currentSigner !== null) {
        const newContract = PostManager__factory.connect(
          isProd
            ? CONTRACT_ADDRESS[SupportedChainId.MAINNET]
            : CONTRACT_ADDRESS[chainId ? chainId : SupportedChainId.RINKEBY],
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
