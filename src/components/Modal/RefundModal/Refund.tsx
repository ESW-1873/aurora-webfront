import React, { VFC } from 'react'
import { Donation } from 'src/api/types'
import { RefundButton } from 'src/components/Buttons/CtaButton'
import { AddressLabel } from 'src/components/ExplorerLabel'
import { MaticValueLabel } from 'src/components/Label'
import { useContract } from 'src/external/contract/hooks'
import { fontWeightSemiBold } from 'src/styles/font'
import { weiToMatic } from 'src/utils/amount'
import styled from 'styled-components'
import { Heading, SubHeading } from '../common'
import { useWithTxModalContext } from '../WithTxModal'

export const Refund: VFC<{ refundRequest: Donation }> = ({
  refundRequest: { sender, amount, receiptId },
}) => {
  const { refund } = useContract()
  const { setLoading, onSuccess, onFail } = useWithTxModalContext()
  return (
    <>
      <Layout>
        <Heading>Refund</Heading>
        <SubHeading>It might be returned</SubHeading>
        <AddressDiv>
          <p>To: </p>
          <AddressLabel address={sender} />
        </AddressDiv>
        <MaticValueLabel value={weiToMatic(amount)} />
        <RefundButton
          onClick={async () => {
            setLoading(true)
            try {
              const tx = await refund(receiptId, amount)
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
const AddressDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    font-size: 18px;
    font-weight: ${fontWeightSemiBold};
  }
`
