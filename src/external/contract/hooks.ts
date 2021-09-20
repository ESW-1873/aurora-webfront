import AsyncRetry from 'async-retry'
import {
  BigNumber,
  ContractReceipt,
  ContractTransaction,
  ethers,
  utils,
} from 'ethers'
import { useCallback } from 'react'
import { useContractStore, useWalletStore } from 'src/stores'

// common logic for usecase related to using contract
/** wrapper when call Contract methods  */
const call = async (func: Promise<ContractTransaction>) => {
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

const waitConfirmations = async (
  txHash: string,
  provider: ethers.providers.Web3Provider,
  confirmations = 1,
) =>
  AsyncRetry(
    async () => {
      const res = await provider.getTransaction(txHash)
      if (!res || res.confirmations < confirmations) throw new Error()
      return res
    },
    {
      forever: true,
    },
  )

/**
 * Consts for using Contract
 * TODO: resetting
 */
const DEFAULT_GAS_LIMIT = 10000000
const DEFAULT_GAS_PRICE = 20000000000
export const DEFAULT_CAPACITY = 100000
export const DEFAULT_PERIOD_SECONDS = 60 * 60 * 24 * 3
// プロジェクト有効期間の最大値: 7日間
export const MAX_EXPIRATION_SECONDS = 60 * 60 * 24 * 7

/**
 * Contractを利用するためのhooks
 */
export const useContract = () => {
  const { web3Provider } = useWalletStore()
  const { contract } = useContractStore()

  const donate = useCallback(
    async (postId: string, amountMatic: string, metadata: string) => {
      if (!web3Provider || !contract) return handleNoContract()
      const parsedAmount = utils.parseEther(amountMatic) // matic to wei
      return call(
        contract.donate(postId, metadata, {
          value: parsedAmount,
          gasLimit: DEFAULT_GAS_LIMIT,
          gasPrice: DEFAULT_GAS_PRICE,
        }),
      )
    },
    [contract, web3Provider],
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
      metadata: string,
    ): Promise<ContractReceipt | ContractTransaction | null> => {
      if (contract === null) return handleNoContract()
      return call(
        contract.requestRefund(receiptId, metadata, {
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

  const withdraw = useCallback(
    async (
      postId: string,
    ): Promise<ContractReceipt | ContractTransaction | null> => {
      if (contract === null) return handleNoContract()
      return call(contract.withdraw(postId, { gasLimit: DEFAULT_GAS_LIMIT }))
    },
    [contract],
  )

  const raise = useCallback(
    async (
      metadataURI: string,
      capacity?: number,
      periodSeconds?: number,
    ): Promise<ContractReceipt | ContractTransaction | null> => {
      if (contract === null) return handleNoContract()
      return call(
        contract.newPost(
          metadataURI,
          BigNumber.from(capacity || DEFAULT_CAPACITY),
          BigNumber.from(periodSeconds || DEFAULT_PERIOD_SECONDS),
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
    withdraw,
    raise,
  }
}
