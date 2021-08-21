import { SupportedChainId } from './chains'

type ChainInfo = { [chainId: number]: string }

export const CONTRACT_ADDRESS: ChainInfo = {
  [SupportedChainId.MAINNET]: '', // TODO:
  [SupportedChainId.RINKEBY]: '0x7dAE29479fE2Ebf4fd02D300F6dB603Bf26D505f', // TODO: 変更したら追従するようにする仕組みを検討
  [SupportedChainId.GANACHE]: '', // SET YOUR CONTRACT ADDRESS
}
