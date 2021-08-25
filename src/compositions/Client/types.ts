export type ABI = Element[]

export type Element = {
  name: string
  type: 'constructor' | 'function'
  stateMutability: 'view' | 'nonpayable' | 'payable'
  inputs: Field[]
  outputs: Field[]
}

export type Field = {
  name: string
  type: 'address' | 'uint256'
  internalType: 'address' | 'uint256' | 'string' | 'bool'
}
