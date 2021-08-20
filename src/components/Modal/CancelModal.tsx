import React, { VFC } from 'react'
import { CancelButton } from 'src/components/Buttons/CtaButton'
import { useCancelModalStore } from 'src/stores'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'
import { Modal } from '.'
import { EthValueLabel } from '../Label'
import { Heading, SubHeading } from './common'

export const CancelModal: VFC<{ cancelableAmount: string }> = ({
  cancelableAmount,
}) => {
  const { isOpen, close } = useCancelModalStore()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={close}>
        <Layout>
          <Heading>Cancel</Heading>
          <SubHeading>Amount to be returned</SubHeading>
          <EthValueLabel value={weiToEth(cancelableAmount)} />
          <CancelButton />
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
