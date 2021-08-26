import { Provider } from '@ethersproject/providers'
import { Contract, Signer } from 'ethers'
import { convert, toOption } from './../converter'
import { ABI, Element } from './../types'

const DEFAULT_GAS_LIMIT = '4500000'

export class ContractModel {
  readonly contract: Contract

  constructor(props: {
    address: string
    abi: ABI
    signerOrProvider: Signer | Provider
  }) {
    this.contract = new Contract(
      props.address,
      props.abi,
      props.signerOrProvider,
    )
  }

  readonly call = async (
    element: Element,
    data: { [x: string]: string },
    gasLimit = DEFAULT_GAS_LIMIT,
  ) => {
    const func = this.contract[element.name]
    if (!func) throw new Error(`Function not found: ${element.name}`)
    const args = element.inputs.map(({ type }, idx) => {
      const input = data.args[idx]
      return convert(type, input)
    })
    const option = toOption(element.stateMutability, gasLimit, data.value)
    return func(...args, option)
  }
}
