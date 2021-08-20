import React, { VFC } from 'react'
import { RefundButton } from 'src/components/Buttons/CtaButton'
import { EthValueLabel } from 'src/components/Label'
import { useContract } from 'src/external/contract/hooks'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'
import { RefundRequestModalProps } from '.'
import { Heading, SubHeading } from '../common'
import { useWithTxModalContext } from '../WithTxModal'

export const RefundRequest: VFC<RefundRequestModalProps> = ({
  receiptId,
  refundableAmount,
}) => {
  const { requestRefund } = useContract()
  const { setLoading, onSuccess, onFail } = useWithTxModalContext()
  return (
    <>
      <Layout>
        <Heading>Refund request</Heading>
        <SubHeading>It might be returned</SubHeading>
        <EthValueLabel value={weiToEth(refundableAmount)} />
        <RefundButton
          onClick={async () => {
            setLoading(true)
            try {
              const tx = await requestRefund(receiptId) // TODO: add metadataURI
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
