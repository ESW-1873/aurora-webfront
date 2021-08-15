export enum SupportedChainId {
  MAINNET = 1,
  RINKEBY = 4,
}

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
]

export const DEV_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.RINKEBY,
]

export type SupportedChainIdType = typeof SUPPORTED_CHAIN_IDS[number]

interface SupportedChainInfo {
  readonly explorer: string
  readonly label: string
}

type ChainInfo = { readonly [chainId: number]: SupportedChainInfo } & {
  readonly [chainId in SupportedChainIdType]: SupportedChainInfo
}

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    explorer: 'https://etherscan.io/',
    label: 'Mainnet',
  },
  [SupportedChainId.RINKEBY]: {
    explorer: 'https://rinkeby.etherscan.io/',
    label: 'Rinkeby',
  },
}
