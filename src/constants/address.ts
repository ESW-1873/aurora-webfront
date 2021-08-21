import { SupportedChainId } from './chains'

type ChainInfo = { [chainId: number]: string }

export const CONTRACT_ADDRESS: ChainInfo = {
  [SupportedChainId.MAINNET]: '', // TODO:
  [SupportedChainId.RINKEBY]: '0x3562F9D4C545448f0532cDD008455B1E13392A72', // TODO: 変更したら追従するようにする仕組みを検討
  [SupportedChainId.GANACHE]: '', // SET YOUR CONTRACT ADDRESS
}
