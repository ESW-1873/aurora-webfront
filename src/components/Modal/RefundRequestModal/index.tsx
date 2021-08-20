import React, { VFC } from 'react'
import { useRefundRequestModalStore } from 'src/stores'
import { WithTxModal } from '../WithTxModal'
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
  return (
    <WithTxModal isOpen={isOpen} close={close}>
      <RefundRequest
        receiptId={receiptId}
        refundableAmount={refundableAmount}
      />
    </WithTxModal>
  )
}
