import { VFC } from 'react'
import { CHAIN_INFO, SupportedChainId } from 'src/constants/chains'
import { useWalletStore } from 'src/stores'
import { fontWeightLight } from 'src/styles/font'
import { shortenAddress } from 'src/utils/address'
import { ellipsizeMid } from 'src/utils/string'
import styled, { css } from 'styled-components'

export const AddressLabel: VFC<{ address: string }> = ({ address }) => {
  const { chainId } = useWalletStore()
  const { explorer } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MATIC]
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
export const AddressButton: VFC<{ address: string; onClick: VoidFunction }> = ({
  address,
  onClick,
}) => <AccountButton onClick={onClick}>{shortenAddress(address)}</AccountButton>

export const TxHashLabel: VFC<{ txHash: string }> = ({ txHash }) => {
  const { chainId } = useWalletStore()
  const { explorer } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MATIC]
  return (
    <AccountLink
      href={`${explorer}tx/${txHash}`}
      target="_blank"
      rel="noreferrer"
    >
      {ellipsizeMid(txHash, 6, 4)}
    </AccountLink>
  )
}

const labelStyle = css`
  font-weight: ${fontWeightLight};
  text-decoration: underline;
  letter-spacing: -0.04em;
  line-height: 1.25;
  text-align: right;
`

const AccountLink = styled.a`
  ${labelStyle};
`
const AccountButton = styled.button`
  ${labelStyle};
  :not(:last-child) {
    margin-bottom: 16px;
  }
`
