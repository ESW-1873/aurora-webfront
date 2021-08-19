import { SupportedChainId } from './chains'

type ChainInfo = { [chainId: number]: string }

export const CONTRACT_ADDRESS: ChainInfo = {
  [SupportedChainId.MAINNET]: '', // TODO:
  [SupportedChainId.RINKEBY]: '0x0f07BB59C7172eDe92fB9cb571119bE27EDdB9c1', // TODO: 変更したら追従するようにする仕組みを検討
}
