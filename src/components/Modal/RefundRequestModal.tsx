import React, { VFC } from 'react'
import { RefundButton } from 'src/components/Buttons/CtaButton'
import { useRefundRequestModalStore } from 'src/stores'
import styled from 'styled-components'
import { Modal } from '.'
import { Heading, SubHeading } from './common'

const SAMPLE_REFUNDABLE_VALUE = 1.03

export const RefundRequestModal: VFC = () => {
  const { isOpen, close } = useRefundRequestModalStore()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={close}>
        <Layout>
          <Heading>Refund request</Heading>
          <SubHeading>It might be returned</SubHeading>
          <RefundButton />
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
  ${SubHeading} {
    margin-bottom: 40px;
  }
  button:not(:last-child) {
    margin-bottom: 24px;
  }
`
