import React, { VFC } from 'react'
import { CancelButton } from 'src/components/Buttons/CtaButton'
import { MaticValueLabel } from 'src/components/Label'
import { useContract } from 'src/external/contract/hooks'
import { weiToMatic } from 'src/utils/amount'
import styled from 'styled-components'
import { CancelModalProps } from '.'
import { Heading, SubHeading } from '../common'
import { useWithTxModalContext } from '../WithTxModal'

export const Cancel: VFC<CancelModalProps> = ({
  ownDonation: { amount, receiptId },
}) => {
  const { cancel } = useContract()
  const { setLoading, onSuccess, onFail } = useWithTxModalContext()
  return (
    <>
      <Layout>
        <Heading>Cancel</Heading>
        <SubHeading>Amount to be returned</SubHeading>
        <MaticValueLabel value={weiToMatic(amount)} />
        <CancelButton
          onClick={async () => {
            setLoading(true)
            try {
              const tx = await cancel(receiptId)
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
