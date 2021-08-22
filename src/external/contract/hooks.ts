import { BigNumber, ContractReceipt, ContractTransaction, utils } from 'ethers'
import { useCallback } from 'react'
import { useContractStore } from 'src/stores'

// common logic for usecase related to using contract
/** wrapper when call Contract methods  */
async function call(
  func: Promise<ContractTransaction>,
): Promise<ContractReceipt | ContractTransaction | null> {
  try {
    const tx = await func
    return tx
  } catch (e) {
    console.error(e)
    throw e
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
const DEFAULT_GAS_LIMIT = 4500000
const DEFAULT_CAPACITY = 100000
const DEFAULT_PERIOD_HOURS = 60 * 60 * 24 * 3
const DEFAULT_METADATA_URI = 'unyIhiKh3399qUszWer0fjy38ppVlujh35SRBAT7DL0'
/**
 * Contractを利用するためのhooks
 */
export const useContract = () => {
  const { contract } = useContractStore()

  const donate = useCallback(
    async (
      postId: string,
      amount: string,
    ): Promise<ContractReceipt | ContractTransaction | null> => {
      if (contract === null) return handleNoContract()
      const parsedAmount = utils.parseEther(amount) // ether to wei
      return call(
        contract.donate(postId, DEFAULT_METADATA_URI, {
          value: parsedAmount,
          gasLimit: DEFAULT_GAS_LIMIT,
        }),
      )
    },
    [contract],
  )

  const cancel = useCallback(
    async (
      receiptId: string,
    ): Promise<ContractReceipt | ContractTransaction | null> => {
      if (contract === null) return handleNoContract()
      return call(
        contract.cancel(receiptId, {
          gasLimit: DEFAULT_GAS_LIMIT,
        }),
      )
    },
    [contract],
  )

  const requestRefund = useCallback(
    async (
      receiptId: string,
    ): Promise<ContractReceipt | ContractTransaction | null> => {
      if (contract === null) return handleNoContract()
      return call(
        contract.requestRefund(receiptId, DEFAULT_METADATA_URI, {
          gasLimit: DEFAULT_GAS_LIMIT,
        }),
      )
    },
    [contract],
  )

  const refund = useCallback(
    async (
      receiptId: string,
      amount: string,
    ): Promise<ContractReceipt | ContractTransaction | null> => {
      if (contract === null) return handleNoContract()
      return call(
        contract.refund(receiptId, {
          value: amount,
          gasLimit: DEFAULT_GAS_LIMIT,
        }),
      )
    },
    [contract],
  )

  const raise = useCallback(
    async (
      metadataURI: string,
      capacity: number = DEFAULT_CAPACITY,
      periodHours: number = DEFAULT_PERIOD_HOURS,
    ): Promise<ContractReceipt | ContractTransaction | null> => {
      if (contract === null) return handleNoContract()
      return call(
        contract.newPost(
          metadataURI,
          BigNumber.from(capacity),
          BigNumber.from(periodHours),
          {
            gasLimit: DEFAULT_GAS_LIMIT,
          },
        ),
      )
    },
    [contract],
  )

  return {
    donate,
    cancel,
    requestRefund,
    refund,
    raise,
  }
}
