import React, { VFC } from 'react'
import { RefundButton } from 'src/components/Buttons/CtaButton'
import { EthValueLabel } from 'src/components/Label'
import { useContract } from 'src/external/contract/hooks'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'
import { RefundRequestModalProps } from '.'
import { Heading, SubHeading } from '../common'

type RefundRequestProps = {
  setLoading: (arg0: boolean) => void
  setsubmitted: (arg0: boolean) => void
  setError: (err: any) => void
} & RefundRequestModalProps

export const RefundRequest: VFC<RefundRequestProps> = ({
  receiptId,
  refundableAmount,
  setLoading,
  setsubmitted,
  setError,
}) => {
  const { requestRefund } = useContract()
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
              setLoading(false)
              setError(error)
              console.error(error)
              return
            }
            setLoading(false)
            setsubmitted(true)
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
