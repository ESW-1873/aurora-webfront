import { SupportedChainId } from './chains'

type ChainInfo = { [chainId: number]: string }

export const CONTRACT_ADDRESS: ChainInfo = {
  [SupportedChainId.MAINNET]: '', // TODO:
  [SupportedChainId.RINKEBY]: '0x4262dd8840D68dE4aF578f1AC2Cb404F31dc43C3', // TODO: 変更したら追従するようにする仕組みを検討
  [SupportedChainId.GANACHE]: '', // SET YOUR CONTRACT ADDRESS
}
