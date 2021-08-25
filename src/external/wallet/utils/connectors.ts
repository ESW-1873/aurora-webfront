import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import {
  DEV_SUPPORTED_CHAIN_IDS,
  SUPPORTED_CHAIN_IDS,
} from 'src/constants/chains'
import { isProd } from 'src/utils/env'

/** Metamask in case of web */
export const injected = new InjectedConnector({
  supportedChainIds: isProd ? SUPPORTED_CHAIN_IDS : DEV_SUPPORTED_CHAIN_IDS,
})

const INFURA_ID = '602183a665b846d7af6d11341f98261a'
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
