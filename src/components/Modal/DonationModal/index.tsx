import React, { VFC } from 'react'
import { PostContent } from 'src/api/types'
import { useDonationModalStore } from 'src/stores'
import { WithTxModal } from '../WithTxModal'
import { Donation } from './Donation'

export type DonationModalProps = {
  postId: string
  totalDonation: string
  refetch: () => Promise<PostContent>
}

export const DonationModal: VFC<DonationModalProps> = ({
  postId,
  totalDonation,
  refetch,
}) => {
  const { isOpen, close } = useDonationModalStore()
  return (
    <WithTxModal isOpen={isOpen} close={close}>
      <Donation
        postId={postId}
        totalDonation={totalDonation}
        refetch={refetch}
      />
    </WithTxModal>
  )
}
