import React, { useState, VFC } from 'react'
import { useRefundRequestModalStore } from 'src/stores'
import { Modal } from '..'
import { Confirmation, Submitted, TxError } from '../TxModal'
import { RefundRequest } from './RefundRequest'

export type RefundRequestModalProps = {
  receiptId: string
  refundableAmount: string
}

export const RefundRequestModal: VFC<RefundRequestModalProps> = ({
  receiptId,
  refundableAmount,
}) => {
  const { isOpen, close } = useRefundRequestModalStore()
  const [loading, setLoading] = useState(false)
  const [submitted, setsubmitted] = useState(false)
  const [error, setError] = useState()
  const onClose = () => {
    close()
    setError(undefined)
    setsubmitted(false)
  }

  const getRefundRequestModalContent = () => {
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
      <RefundRequest
        setLoading={setLoading}
        setsubmitted={setsubmitted}
        setError={setError}
        receiptId={receiptId}
        refundableAmount={refundableAmount}
      />
    )
  }
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      {getRefundRequestModalContent()}
    </Modal>
  )
}
