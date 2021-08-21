import React, { VFC } from 'react'
import { useRefundModalStore } from 'src/stores/Modal/refundModal'
import { WithTxModal } from '../WithTxModal'
import { Refund } from './Refund'

export type RefundModalProps = {}

export const RefundModal: VFC<RefundModalProps> = () => {
  const { refundRequest, close } = useRefundModalStore()
  return (
    <WithTxModal isOpen={!!refundRequest} close={close}>
      {refundRequest && <Refund refundRequest={refundRequest} />}
    </WithTxModal>
  )
}
