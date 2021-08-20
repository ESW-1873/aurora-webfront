import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedDonateModalAtom } from 'src/stores/Modal/donateModal'
import { Modal } from '..'
import { Confirmation } from '../TxModal/Confirmation'
import { Submitted } from '../TxModal/Submitted'
import { TxError } from '../TxModal/TxError'

export default {
  title: 'TxModal',
  decorators: [
    (Story: VFC) => (
      <RecoilRoot
        initializeState={(snap) => snap.set(isOpenedDonateModalAtom, true)}
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
