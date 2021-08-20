import React, { VFC } from 'react'
import { useDonationModalStore } from 'src/stores'
import { WithTxModal } from '../WithTxModal'
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
  return (
    <WithTxModal isOpen={isOpen} close={close}>
      <Donation postId={postId} totalDonation={totalDonation} />
    </WithTxModal>
  )
}
