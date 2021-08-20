import React, { VFC } from 'react'
import { Donation } from 'src/api/types'
import { useRefundRequestModalStore } from 'src/stores'
import { WithTxModal } from '../WithTxModal'
import { RefundRequest } from './RefundRequest'

export type RefundRequestModalProps = {
  ownDonation: Donation
}

export const RefundRequestModal: VFC<RefundRequestModalProps> = ({
  ownDonation,
}) => {
  const { isOpen, close } = useRefundRequestModalStore()
  return (
    <WithTxModal isOpen={isOpen} close={close}>
      <RefundRequest ownDonation={ownDonation} />
    </WithTxModal>
  )
}
