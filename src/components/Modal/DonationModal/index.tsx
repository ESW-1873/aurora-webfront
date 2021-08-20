import React, { useState, VFC } from 'react'
import { useDonationModalStore } from 'src/stores'
import { Modal } from '..'
import { Confirmation, Submitted, TxError } from '../TxModal'
import { Donation } from './Donation'

export type DonationModalProps = {
  postId: string
  totalDonation: string
}

export const DonationModal: VFC<DonationModalProps> = ({
  postId,
  totalDonation,
}) => {
  const { isOpen, close } = useDonationModalStore()
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
