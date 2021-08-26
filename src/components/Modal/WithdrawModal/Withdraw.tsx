import React, { VFC } from 'react'
import { PrimaryTxButton } from 'src/components/Buttons/CtaButton'
import { MaticValueLabel } from 'src/components/Label'
import { useContract } from 'src/external/contract/hooks'
import { weiToMatic } from 'src/utils/amount'
import styled from 'styled-components'
import { Heading, SubHeading } from '../common'
import { useWithTxModalContext } from '../WithTxModal'

export type WithdrawProps = { postId: string; amount: string }
export const Withdraw: VFC<WithdrawProps> = ({ postId, amount }) => {
  const { withdraw } = useContract()
  const { setLoading, onSuccess, onFail } = useWithTxModalContext()
  return (
    <>
      <Layout>
        <Heading>Withdraw</Heading>
        <SubHeading>You will get</SubHeading>
        <MaticValueLabel value={weiToMatic(amount)} />
        <PrimaryTxButton
          label="Withdraw"
          onClick={async () => {
            setLoading(true)
            try {
              const tx = await withdraw(postId)
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
