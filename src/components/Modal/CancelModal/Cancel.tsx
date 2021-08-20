import React, { VFC } from 'react'
import { CancelButton } from 'src/components/Buttons/CtaButton'
import { EthValueLabel } from 'src/components/Label'
import { useContract } from 'src/external/contract/hooks'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'
import { CancelModalProps } from '.'
import { Heading, SubHeading } from '../common'

type CancelProps = {
  setLoading: (arg0: boolean) => void
  setsubmitted: (arg0: boolean) => void
  setError: (err: any) => void
} & CancelModalProps

export const Cancel: VFC<CancelProps> = ({
  cancelableAmount,
  receiptId,
  setLoading,
  setsubmitted,
  setError,
}) => {
  const { cancel } = useContract()
  return (
    <>
      <Layout>
        <Heading>Cancel</Heading>
        <SubHeading>Amount to be returned</SubHeading>
        <EthValueLabel value={weiToEth(cancelableAmount)} />
        <CancelButton
          onClick={async () => {
            setLoading(true)
            try {
              const tx = await cancel(receiptId)
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
