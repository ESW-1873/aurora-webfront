import { ContractReceipt, ContractTransaction } from 'ethers'
import { useCallback } from 'react'
import { useContractStore } from 'src/stores'

// common logic for usecase related to using contract
/** wrapper when call Contract methods  */
async function call(
  func: Promise<ContractTransaction>,
): Promise<ContractReceipt | null> {
  try {
    const tx = await func
    return await tx.wait()
  } catch (e) {
    console.error(e) // TODO: handling when validated
    return null
  }
}
/** overhead processing when no contract */
function handleNoContract() {
  console.error('need connection to contract') // TODO: error handling
  return null
}

/**
 * Consts for using Contract
 * TODO: resetting
 */
const DEFAULT_AMOUNT = '1'
const DEFAULT_GAS_LIMIT = 4500000

/**
 * Contractを利用するためのhooks
 */
export function useContract() {
  const { contract } = useContractStore()

  /** issue */
  const issue = useCallback(async (): Promise<ContractReceipt | null> => {
    if (contract === null) return handleNoContract()

    return call(
      contract.issue({
        gasLimit: DEFAULT_GAS_LIMIT,
      }),
    )
  }, [contract])

  /** stake */
  const stake = useCallback(
    async (
      toAddress: string,
      amount?: string,
    ): Promise<ContractReceipt | null> => {
      if (contract === null) return handleNoContract()

      const _amount = amount ? amount : DEFAULT_AMOUNT
      return call(
        contract.stake(toAddress, _amount, {
          gasLimit: DEFAULT_GAS_LIMIT,
        }),
      )
    },
    [contract],
  )

  /** unstake */
  const unstake = useCallback(
    async (
      toAddress: string,
      amount?: string,
    ): Promise<ContractReceipt | null> => {
      if (contract === null) return handleNoContract()

      const _amount = amount ? amount : DEFAULT_AMOUNT
      return call(
        contract.unstake(toAddress, _amount, {
          gasLimit: DEFAULT_GAS_LIMIT,
        }),
      )
    },
    [contract],
  )

  /** restake */
  const restake = useCallback(
    async (
      fromAddress: string,
      toAddress: string,
      amount?: string,
    ): Promise<ContractReceipt | null> => {
      if (contract === null) return handleNoContract()

      const _amount = amount ? amount : DEFAULT_AMOUNT
      return call(
        contract.restake(fromAddress, toAddress, _amount, {
          gasLimit: DEFAULT_GAS_LIMIT,
        }),
      )
    },
    [contract],
  )

  return {
    issue,
    stake,
    unstake,
    restake,
  }
}
