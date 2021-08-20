import React, { VFC } from 'react'
import { useCancelModalStore } from 'src/stores'
import { WithTxModal } from '../WithTxModal'
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

  return (
    <WithTxModal isOpen={isOpen} close={close}>
      <Cancel receiptId={receiptId} cancelableAmount={cancelableAmount} />
    </WithTxModal>
  )
}
