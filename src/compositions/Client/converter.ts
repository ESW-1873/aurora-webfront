import { BigNumber } from 'ethers'
import { FieldType, Method } from './types'

const IS_NUMBER = /^u?int/
export const convert = (type: FieldType, input: string) => {
  if (IS_NUMBER.test(type)) return BigNumber.from(input)
  return input
}

export const toOption = (
  stateMutability: Method['stateMutability'],
  gasLimit: string,
  value?: string,
) => ({
  value:
    stateMutability === 'payable' && value ? BigNumber.from(value) : undefined,
  gasLimit: stateMutability === 'view' ? undefined : gasLimit,
})
