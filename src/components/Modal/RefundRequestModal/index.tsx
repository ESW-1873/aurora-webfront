import React, { VFC } from 'react'
import { Donation } from 'src/api/types'
import { useRefundRequestModalStore } from 'src/stores'
import { WithTxModal } from '../WithTxModal'
import { RefundRequest } from './RefundRequest'

export type RefundRequestModalProps = {
  postId: string
  ownDonation: Donation
}

export const RefundRequestModal: VFC<RefundRequestModalProps> = ({
  postId,
  ownDonation,
}) => {
  const { isOpen, close } = useRefundRequestModalStore()
  return (
    <WithTxModal isOpen={isOpen} close={close}>
      <RefundRequest postId={postId} ownDonation={ownDonation} />
    </WithTxModal>
  )
}
