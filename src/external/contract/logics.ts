import { ethers } from 'ethers'
import { useCallback, useState } from 'react'
import type { HologramRelation } from './types'
import { HologramRelation__factory } from './types'

// TODO: Temp logic for using wallet
declare global {
  interface Window {
    ethereum: any
  }
}

export function useHologramRelation() {
  const [balance, setBalance] = useState<ethers.BigNumber | undefined>(
    undefined,
  )

  const connect = useCallback(
    async ({
      address,
    }: {
      address: string
    }): Promise<HologramRelation | null> => {
      // TODO: Temp logic for using wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      if (provider !== null) {
        return HologramRelation__factory.connect(address, provider?.getSigner())
      } else {
        return null
      }
    },
    [],
  )

  const issue = useCallback(
    async ({ address }: { address: string }) => {
      const contract = await connect({ address: address })
      if (contract !== null) {
        await contract.initialize({ gasLimit: 1000 })
        console.log(await contract.issue())
      }
    },
    [connect],
  )

  const balanceOf = useCallback(
    async ({ address }: { address: string }) => {
      const contract = await connect({ address: address })
      if (contract !== null) {
        await contract.initialize({ gasLimit: 1000 })
        setBalance(await contract.balanceOf(address))
      }
    },
    [connect],
  )

  return {
    issue,
    balance,
    balanceOf,
  }
}
