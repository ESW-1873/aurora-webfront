// see: https://docs.soliditylang.org/en/v0.5.3/abi-spec.html

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
  type: 'address' | 'uint256' | 'string' | 'bool'
  internalType: 'address' | 'uint256' | 'string' | 'bool'
}

export type FieldType = FieldTypes | `${FieldTypes}[]`

type FieldTypes =
  | 'address'
  | 'string'
  | 'bool'
  | `fixed`
  | `ufixed`
  | `fixed${number}x${number}`
  | `ufixed${number}x${number}`
  | `bytes${number}`
  | `function`
  | NumberField

type NumberField = `int` | `uint` | `int${number}` | `uint${number}`
