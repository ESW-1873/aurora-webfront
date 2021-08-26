import React, { VFC } from 'react'
import { postClient } from 'src/api/postClient'
import { RefundRequestButton } from 'src/components/Buttons/CtaButton'
import { EthValueLabel } from 'src/components/Label'
import { useContract } from 'src/external/contract/hooks'
import { useWalletStore } from 'src/stores'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'
import { RefundRequestModalProps } from '.'
import { Heading, SubHeading } from '../common'
import { useWithTxModalContext } from '../WithTxModal'

export const RefundRequest: VFC<RefundRequestModalProps> = ({
  postId,
  ownDonation: { amount, receiptId },
}) => {
  const { account } = useWalletStore()
  const { requestRefund } = useContract()
  const { setLoading, onSuccess, onFail } = useWithTxModalContext()
  return (
    <>
      <Layout>
        <Heading>Refund request</Heading>
        <SubHeading>It might be returned</SubHeading>
        <EthValueLabel value={weiToEth(amount)} />
        <RefundRequestButton
          onClick={async () => {
            setLoading(true)
            try {
              if (!account) throw new Error('You must connect wallet.')
              const res = await postClient.postRefund({
                postId,
              })
              const tx = await requestRefund(receiptId, res.data.metadata)
              console.log(tx)
            } catch (error: any) {
              onFail(error)
              console.error(error)
              return
            }
            onSuccess()
          }}
        />
      </Layout>
    </>
  )
}

const Layout = styled.div`
  ${Heading} {
    margin-bottom: 16px;
  }
  ${SubHeading}, > div, button:not(:last-child) {
    margin-bottom: 24px;
  }
`
