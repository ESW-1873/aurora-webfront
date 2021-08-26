import { ethers } from 'ethers'

export const weiToEth = (wei: string) => ethers.utils.formatUnits(wei, 'ether')
