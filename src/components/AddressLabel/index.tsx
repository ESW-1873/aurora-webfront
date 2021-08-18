import { useWeb3React } from '@web3-react/core'
import { VFC } from 'react'
import { CHAIN_INFO, SupportedChainId } from 'src/constants/chains'
import { fontWeightLight } from 'src/styles/font'
import { shortenAddress } from 'src/utils/address'
import styled from 'styled-components'

export const AddressLabel: VFC<{ address: string }> = ({ address }) => {
  const { chainId } = useWeb3React()
  const { explorer } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET]
  return (
    <AccountLink
      href={`${explorer}address/${address}`}
      target="_blank"
      rel="noreferrer"
    >
      {shortenAddress(address)}
    </AccountLink>
  )
}

const AccountLink = styled.a`
  font-weight: ${fontWeightLight};
  text-decoration: underline;
  letter-spacing: -0.04em;
  line-height: 1.25;
  text-align: right;
`
