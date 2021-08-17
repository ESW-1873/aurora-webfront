import React, { VFC } from 'react'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { useDonateModalStore } from 'src/stores'
import styled from 'styled-components'
import { Modal } from '.'
import { Heading, SubHeading } from './common'

const SAMPLE_TOTAL_DONATION = 194.73

export const DonationModal: VFC = () => {
  const { isOpen, close } = useDonateModalStore()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={close}>
        <Layout>
          <Heading>Donation</Heading>
          <SubHeading>{`Total Donation ${SAMPLE_TOTAL_DONATION} ETH`}</SubHeading>
          <PrimaryButton label="Donate" />
          <PrimaryButton label="Donate" />
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
