import React, { useState, VFC } from 'react'
import { useDonateModalStore } from 'src/stores'
import { Modal } from '..'
import { Confirmation } from '../TxModal/Confirmation'
import { Submitted } from '../TxModal/Submitted'
import { TxError } from '../TxModal/TxError'
import { Donation } from './Donation'

export type DonateModalProps = {
  postId: string
  totalDonation: string
}

export const DonateModal: VFC<DonateModalProps> = ({
  postId,
  totalDonation,
}) => {
  const { isOpen, close } = useDonateModalStore()
  const [loading, setLoading] = useState(false)
  const [submitted, setsubmitted] = useState(false)
  const [error, setError] = useState()
  const onClose = () => {
    close()
    setError(undefined)
    setsubmitted(false)
  }

  const getDonationModalContent = () => {
    if (error) {
      return <TxError error={error} />
    }
    if (loading) {
      return <Confirmation />
    }
    if (submitted) {
      return <Submitted close={onClose} />
    }
    return (
      <Donation
        setLoading={setLoading}
        setsubmitted={setsubmitted}
        setError={setError}
        postId={postId}
        totalDonation={totalDonation}
      />
    )
  }
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      {getDonationModalContent()}
    </Modal>
  )
}
