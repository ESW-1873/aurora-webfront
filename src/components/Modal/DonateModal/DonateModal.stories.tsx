import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedDonateModalAtom } from 'src/stores/Modal/donateModal'
import { DonateModal } from '.'
import { Modal } from '..'
import { Confirmation } from '../TxModal/Confirmation'
import { Submitted } from '../TxModal/Submitted'
import { TxError } from '../TxModal/TxError'

export default {
  title: 'DonateModal',
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

const MOCK_POST_ID = '0x1994f5a902ef80'
const MOCK_TOTAL_DONATION = '12.32344'

export const DonateModalPage = () => (
  <DonateModal postId={MOCK_POST_ID} totalDonation={MOCK_TOTAL_DONATION} />
)

export const ConfirmationModalPage = () => <Confirmation />

export const SubmittedMoalPage = () => <Submitted close={() => {}} />

export const TxErrorMoalPage = () => <TxError error={{ code: 4001 }} />
