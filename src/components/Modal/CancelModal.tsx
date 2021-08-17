import React, { VFC } from 'react'
import { CancelButton } from 'src/components/Buttons/CtaButton'
import { useCancelModalStore } from 'src/stores'
import styled from 'styled-components'
import { Modal } from '.'
import { Heading, SubHeading } from './common'

const SAMPLE_CANCELABLE_VALUE = 1.03

export const CancelModal: VFC = () => {
  const { isOpen, close } = useCancelModalStore()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={close}>
        <Layout>
          <Heading>Cancel</Heading>
          <SubHeading>Amount to be returned</SubHeading>
          <CancelButton />
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
  ${SubHeading} {
    margin-bottom: 40px;
  }
  button:not(:last-child) {
    margin-bottom: 24px;
  }
`
