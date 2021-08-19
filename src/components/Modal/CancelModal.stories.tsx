import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedCancelModalAtom } from 'src/stores/Modal/cancelModal'
import { CancelModal } from './CancelModal'

export default {
  title: 'CancelModal',
}

const MOCK_CANCELABLE_AMOUNT = '4.8234'

export const Content: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedCancelModalAtom, true)}
  >
    <CancelModal cancelableAmount={MOCK_CANCELABLE_AMOUNT} />
  </RecoilRoot>
)
