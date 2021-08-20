import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'

/**
 * a simple Signer provided by Web3Provider
 *
 * use atom from recoil
 */
/** Signer of Metamask */
const metamaskSignerAtom = atom<ethers.providers.JsonRpcSigner | null>({
  key: 'metamaskSigner',
  default: null,
  dangerouslyAllowMutability: true, // for skipping deep freeze
})
/** Signer of WalletConnect */
const walletConnectSignerAtom = atom<ethers.providers.JsonRpcSigner | null>({
  key: 'walletConnectSigner',
  default: null,
  dangerouslyAllowMutability: true, // for skipping deep freeze
})

/**
 * management selected wallet
 *
 * now, only Metamask & WalletConnect
 */
export type WalletType = 'Metamask' | 'WalletConnect'
const activeWalletTypeAtom = atom<WalletType | null>({
  key: 'currentWalletType',
  default: null,
})

/**
 * current connected wallet event
 *
 * When user connect wallet, fire event (with wallet name)
 */
const currentConnectedWalletTypeAtom = atom<WalletType | null>({
  key: 'currentConnectedWalletType',
  default: null,
})

/**
 * Walletに関連するデータのstate管理を行う
 */
export const useWalletStore = (): {
  error: Error | undefined
  chainId: number | undefined
  account: string | null | undefined
  active: boolean
  activeWalletType: WalletType | null
  metamaskSigner: ethers.providers.JsonRpcSigner | null
  walletConnectSigner: ethers.providers.JsonRpcSigner | null
  currentSigner: ethers.providers.JsonRpcSigner | null
  setActiveWallet: (walletType: WalletType) => void
  activateWallet: (walletType: WalletType) => void
  disconnectMetamask: () => void
  disconnectWalletConnect: () => void
} => {
  const { library, error, account, active, chainId } = useWeb3React()

  const activeWalletType = useRecoilValue(activeWalletTypeAtom)
  const setActiveWalletType = useSetRecoilState(activeWalletTypeAtom)

  const currentConnectedWalletType = useRecoilValue(
    currentConnectedWalletTypeAtom,
  )
  const setCurrentConnectedWalletType = useSetRecoilState(
    currentConnectedWalletTypeAtom,
  )

  const metamaskSigner = useRecoilValue(metamaskSignerAtom)
  const setMetamaskSigner = useSetRecoilState(metamaskSignerAtom)
  const resetMetamaskSigner = useResetRecoilState(metamaskSignerAtom)

  const walletConnectSigner = useRecoilValue(walletConnectSignerAtom)
  const setWalletConnectSigner = useSetRecoilState(walletConnectSignerAtom)
  const resetWalletConnectSigner = useResetRecoilState(walletConnectSignerAtom)

  /**
   * WalletごとのSignerに対する状態管理
   *
   * activeWalletType の変化を検知して、Signer更新を行う
   */
  useEffect(() => {
    if (library) {
      const signer = (library as ethers.providers.Web3Provider).getSigner()
      switch (currentConnectedWalletType) {
        case 'Metamask': {
          setMetamaskSigner(signer)
          console.log('Save Signer in Store from Metamask')
          break
        }
        case 'WalletConnect': {
          setWalletConnectSigner(signer)
          console.log('Save Signer in Store from WalletConnect')
          break
        }
      }
    }
  }, [
    currentConnectedWalletType,
    library,
    setMetamaskSigner,
    setWalletConnectSigner,
  ])

  /** set active wallet when connecting wallet */
  const setActiveWallet = useCallback(
    (walletType: WalletType) => {
      setActiveWalletType(walletType)
    },
    [setActiveWalletType],
  )

  /** set current connected wallet's name */
  const activateWallet = useCallback(
    (walletType: WalletType) => {
      setCurrentConnectedWalletType(walletType)
      setActiveWalletType(walletType)
    },
    [setCurrentConnectedWalletType, setActiveWalletType],
  )

  /**
   * disconnect wallet
   *
   * clear state for wallet
   */
  const disconnectMetamask = useCallback(() => {
    resetMetamaskSigner()
    if (activeWalletType === 'Metamask') {
      setActiveWalletType(null)
    }
  }, [resetMetamaskSigner, activeWalletType, setActiveWalletType])

  const disconnectWalletConnect = useCallback(() => {
    resetWalletConnectSigner()
    if (activeWalletType === 'WalletConnect') {
      setActiveWalletType(null)
    }
  }, [resetWalletConnectSigner, activeWalletType, setActiveWalletType])

  /** get signer of selected wallet */
  const currentSigner: ethers.providers.JsonRpcSigner | null =
    activeWalletType !== null
      ? activeWalletType === 'Metamask'
        ? metamaskSigner
        : walletConnectSigner
      : null

  return {
    error,
    chainId,
    account,
    active,
    activeWalletType,
    metamaskSigner,
    walletConnectSigner,
    currentSigner,
    setActiveWallet,
    activateWallet,
    disconnectMetamask,
    disconnectWalletConnect,
  }
}
