import { SupportedChainId } from './chains'

type ChainInfo = { [chainId: number]: string }

export const CONTRACT_ADDRESS: ChainInfo = {
  [SupportedChainId.MAINNET]: '', // TODO:
  [SupportedChainId.RINKEBY]: '0x7CCa2194BfFAF18533791650920412f5f1a27ff2', // TODO: 変更したら追従するようにする仕組みを検討
  [SupportedChainId.GANACHE]: '', // SET YOUR CONTRACT ADDRESS
}
