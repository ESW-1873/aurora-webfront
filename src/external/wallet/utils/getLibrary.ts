import { ethers } from 'ethers'

/**
 * wallet接続時に、接続情報から共通してethers.providers.Web3Providerを生成する
 * Web3ReactProviderに必要なfunction
 *
 * ref: https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#web3reactprovider
 * ref: https://github.com/Uniswap/uniswap-interface/blob/27f756107eea2e75f284fa3613823ef24576e693/src/utils/getLibrary.ts#L9
 *
 * @param provider
 * @returns ethers.providers.Web3Provider
 */
export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any',
  )
  return library
}
