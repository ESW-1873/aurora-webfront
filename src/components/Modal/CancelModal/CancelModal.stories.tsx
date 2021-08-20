import React from 'react'
import { RecoilRoot } from 'recoil'
import { MOCK_DONATION } from 'src/data/__mocks__'
import { isOpenedCancelModalAtom } from 'src/stores/Modal/cancelModal'
import { CancelModal } from '.'

export default {
  title: 'CancelModal',
}

export const CancelModalPage = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedCancelModalAtom, true)}
  >
    <CancelModal ownDonation={MOCK_DONATION} />
  </RecoilRoot>
)
