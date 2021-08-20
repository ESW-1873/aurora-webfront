import React from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedCancelModalAtom } from 'src/stores/Modal/cancelModal'
import { CancelModal } from '.'

export default {
  title: 'CancelModal',
}

const MOCK_CANCELABLE_AMOUNT = '40000000000000000'

export const CancelModalPage = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedCancelModalAtom, true)}
  >
    <CancelModal receiptId={''} cancelableAmount={MOCK_CANCELABLE_AMOUNT} />
  </RecoilRoot>
)
