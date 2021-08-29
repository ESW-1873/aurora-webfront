import { SupportedChainId } from './chains'

type ChainInfo = { [chainId: number]: string }

export const CONTRACT_ADDRESS: ChainInfo = {
  [SupportedChainId.MATIC]: '0x4516dB20894984Bb1a886B4bE418baf963485F60',
  [SupportedChainId.RINKEBY]: '0xF1e9e04c7FAd488Ca6cD2a8303ccf8B937f455A2', // TODO: 変更したら追従するようにする仕組みを検討
  [SupportedChainId.GANACHE]: '', // SET YOUR CONTRACT ADDRESS
}
