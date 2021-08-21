import { SupportedChainId } from './chains'

type ChainInfo = { [chainId: number]: string }

export const CONTRACT_ADDRESS: ChainInfo = {
  [SupportedChainId.MAINNET]: '', // TODO:
  [SupportedChainId.RINKEBY]: '0x510caA25ad9BE211ceF1892Fe52672Fc820B2cB2', // TODO: 変更したら追従するようにする仕組みを検討
  [SupportedChainId.GANACHE]: '', // SET YOUR CONTRACT ADDRESS
}
