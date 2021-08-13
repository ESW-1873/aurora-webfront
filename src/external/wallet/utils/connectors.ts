import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { isProd } from 'src/utils/env'

/** サポートしているネットワーク */
enum SupportedChainId {
  MAINNET = 1,
  RINKEBY = 4,
}

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [SupportedChainId.MAINNET]

const DEV_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.RINKEBY,
]

/** Metamask in case of web */
export const injected = new InjectedConnector({
  supportedChainIds: isProd ? SUPPORTED_CHAIN_IDS : DEV_SUPPORTED_CHAIN_IDS,
})

const INFURA_ID = '5b086d843739469d8df05dae6fcde6d0' // TODO: need infuraId or rpc (now, temp value)
/** WalletConnect */
export const walletconnect = new WalletConnectConnector({
  supportedChainIds: isProd ? SUPPORTED_CHAIN_IDS : DEV_SUPPORTED_CHAIN_IDS,
  rpc: {
    1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    4: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
  },
  qrcode: true,
  pollingInterval: 15000,
})
