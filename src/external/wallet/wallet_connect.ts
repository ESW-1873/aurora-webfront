import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useWalletStore } from 'src/stores'

const INFURA_ID = '5b086d843739469d8df05dae6fcde6d0' // TODO: need infuraId or rpc

export function useWalletConnect() {
  const { connect: connectWallet } = useWalletStore()

  const connect = useCallback(async () => {
    const provider = new WalletConnectProvider({
      infuraId: INFURA_ID,
      qrcodeModalOptions: {
        mobileLinks: ['metamask'],
      },
    })
    await provider.enable()
    try {
      const signer = connectWallet({
        web3Provider: new ethers.providers.Web3Provider(provider),
      })
      return signer
    } catch (e) {
      // https://github.com/Web3Modal/web3modal/issues/38
      console.error(e)
      return null
    }
  }, [connectWallet])

  return connect
}
