import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedDonationModalAtom } from 'src/stores/Modal/donationModal'
import { Modal } from '..'
import { Confirmation } from './Confirmation'
import { Submitted } from './Submitted'
import { TxError } from './TxError'

export default {
  title: 'TxModal',
  decorators: [
    (Story: VFC) => (
      <RecoilRoot
        initializeState={(snap) => snap.set(isOpenedDonationModalAtom, true)}
      >
        <Modal isOpen={true} closeModal={() => {}}>
          <Story />
        </Modal>
      </RecoilRoot>
    ),
  ],
}

export const ConfirmationModalPage = () => <Confirmation />

export const SubmittedMoalPage = () => <Submitted close={() => {}} />

export const TxErrorMoalPage = () => <TxError error={{ code: 4001 }} />
