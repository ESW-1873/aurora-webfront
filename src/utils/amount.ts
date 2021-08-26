import { ethers } from 'ethers'

export const weiToMatic = (wei: string) =>
  ethers.utils.formatUnits(wei, 'ether')
