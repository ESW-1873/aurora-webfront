import React, { useEffect, useState, VFC } from 'react'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { useDonateModalStore } from 'src/stores'
import styled from 'styled-components'
import { Modal } from '.'
import { DisclaimerCheckbox } from '../Input/Checkbox'
import { DonationInputPanel } from '../Input/DonationInputPanel'
import { Heading, SubHeading } from './common'

export const DonationModal: VFC<{ totalDonation: number }> = ({
  totalDonation,
}) => {
  const { isOpen, close } = useDonateModalStore()
  const [isChecked, setIsChecked] = useState(false)
  const [canDonate, setCanDonate] = useState(false)

  useEffect(() => {
    setCanDonate(isChecked)
  }, [isChecked])

  return (
    <>
      <Modal isOpen={isOpen} closeModal={close}>
        <Layout>
          <Heading>Donation</Heading>
          <SubHeading>{`Total Donation ${totalDonation} ETH`}</SubHeading>
          {/* TODO: refでinputのバリューを取得してdonateする? */}
          {/* TODO: Inputエラーのハンドリング。エラーメッセージをどこに出すか検討 */}
          <DonationInputPanel />
          <DisclaimerCheckbox
            id="disclaimer-check"
            setIsChecked={setIsChecked}
          />
          {/* TODO: Max値と比較して上回ったらinsuficient fundにして非活性 */}
          <PrimaryButton
            label="Donate"
            disabled={!canDonate}
            onClick={() => alert('TODO')}
          />
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
