import React, { VFC } from 'react'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { useDonateModalStore } from 'src/stores'
import styled from 'styled-components'
import { Modal } from '.'
import { DonationInputPanel } from '../Input/DonationInputPanel'
import { Heading, SubHeading } from './common'

export const DonationModal: VFC<{ totalDonation: number }> = ({
  totalDonation,
}) => {
  const { isOpen, close } = useDonateModalStore()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={close}>
        <Layout>
          <Heading>Donation</Heading>
          <SubHeading>{`Total Donation ${totalDonation} ETH`}</SubHeading>
          <DonationInputPanel />
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
  ${SubHeading}, > div, button:not(:last-child) {
    margin-bottom: 24px;
  }
`
