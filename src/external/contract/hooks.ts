import { ContractReceipt, ContractTransaction } from 'ethers'
import { useCallback } from 'react'
import { useContractStore } from 'src/stores'

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

function handleNoContract() {
  console.error('need connection to contract') // TODO: error handling
  return null
}

const DEFAULT_AMOUNT = '1'
const DEFAULT_GAS_LIMIT = 4500000

export function useContract() {
  const { contract } = useContractStore()

  const issue = useCallback(async (): Promise<ContractReceipt | null> => {
    if (contract === null) return handleNoContract()

    return call(
      contract.issue({
        gasLimit: DEFAULT_GAS_LIMIT,
      }),
    )
  }, [contract])

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
