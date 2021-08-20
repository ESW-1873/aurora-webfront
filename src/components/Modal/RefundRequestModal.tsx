import React, { VFC } from 'react'
import { RefundButton } from 'src/components/Buttons/CtaButton'
import { useRefundRequestModalStore } from 'src/stores'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'
import { Modal } from '.'
import { EthValueLabel } from '../Label'
import { Heading, SubHeading } from './common'

export const RefundRequestModal: VFC<{ refundableAmount: string }> = ({
  refundableAmount,
}) => {
  const { isOpen, close } = useRefundRequestModalStore()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={close}>
        <Layout>
          <Heading>Refund request</Heading>
          <SubHeading>It might be returned</SubHeading>
          <EthValueLabel value={weiToEth(refundableAmount)} />
          <RefundButton />
        </Layout>
      </Modal>
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
