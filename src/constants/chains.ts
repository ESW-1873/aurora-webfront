export enum SupportedChainId {
  // MAINNET = 1,
  // RINKEBY = 4,
  MATIC = 137,
  MUMBAI = 80001,
  GANACHE = 1337,
}

export const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [SupportedChainId.MATIC]

export const DEV_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MATIC,
  SupportedChainId.MUMBAI,
  SupportedChainId.GANACHE,
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
  // [SupportedChainId.MAINNET]: {
  //   explorer: 'https://etherscan.io/',
  //   label: 'Mainnet',
  // },
  // [SupportedChainId.RINKEBY]: {
  //   explorer: 'https://rinkeby.etherscan.io/',
  //   label: 'Rinkeby',
  // },
  [SupportedChainId.MATIC]: {
    explorer: 'https://polygonscan.com/',
    label: 'Matic',
  },
  [SupportedChainId.MUMBAI]: {
    explorer: 'https://mumbai.polygonscan.com/',
    label: 'Mumbai',
  },
  [SupportedChainId.GANACHE]: {
    explorer: '',
    label: 'Ganache',
  },
}
