import { Provider } from '@ethersproject/providers'
import { Contract, Signer } from 'ethers'
import { ABI, Element } from './../types'

const abiFunctionsFilter = (
  abi: ABI,
  stateMutatability: Element['stateMutability'],
) =>
  abi.filter(
    (each) =>
      each.type === 'function' && each.stateMutability === stateMutatability,
  )

export class ABIModel {
  readonly abi: ABI
  readonly payables: Element[]
  readonly nonpayables: Element[]
  readonly views: Element[]

  constructor(readonly abiJson: string) {
    this.abi = JSON.parse(abiJson)
    this.payables = abiFunctionsFilter(this.abi, 'payable')
    this.nonpayables = abiFunctionsFilter(this.abi, 'nonpayable')
    this.views = abiFunctionsFilter(this.abi, 'view')
  }

  readonly connect = (address: string, signerOrProvider: Signer | Provider) =>
    new Contract(address, this.abi, signerOrProvider)
}
