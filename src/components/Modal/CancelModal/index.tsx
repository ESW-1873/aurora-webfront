import React, { VFC } from 'react'
import { Donation } from 'src/api/types'
import { useCancelModalStore } from 'src/stores'
import { WithTxModal } from '../WithTxModal'
import { Cancel } from './Cancel'

export type CancelModalProps = {
  ownDonation: Donation
}

export const CancelModal: VFC<CancelModalProps> = ({ ownDonation }) => {
  const { isOpen, close } = useCancelModalStore()

  return (
    <WithTxModal isOpen={isOpen} close={close}>
      <Cancel ownDonation={ownDonation} />
    </WithTxModal>
  )
}
