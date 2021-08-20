import React, { useState, VFC } from 'react'
import { useCancelModalStore } from 'src/stores'
import { Modal } from '..'
import { Confirmation } from '../TxModal/Confirmation'
import { Submitted } from '../TxModal/Submitted'
import { TxError } from '../TxModal/TxError'
import { Cancel } from './Cancel'

export type CancelModalProps = {
  receiptId: string
  cancelableAmount: string
}

export const CancelModal: VFC<CancelModalProps> = ({
  receiptId,
  cancelableAmount,
}) => {
  const { isOpen, close } = useCancelModalStore()
  const [loading, setLoading] = useState(false)
  const [submitted, setsubmitted] = useState(false)
  const [error, setError] = useState()
  const onClose = () => {
    close()
    setError(undefined)
    setsubmitted(false)
  }

  const getCancelModalContent = () => {
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
      <Cancel
        setLoading={setLoading}
        setsubmitted={setsubmitted}
        setError={setError}
        receiptId={receiptId}
        cancelableAmount={cancelableAmount}
      />
    )
  }
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      {getCancelModalContent()}
    </Modal>
  )
}
