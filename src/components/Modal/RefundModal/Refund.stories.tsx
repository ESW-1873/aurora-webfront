import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { MOCK_DONATION } from 'src/data/__mocks__'
import { refundModalAtom } from 'src/stores/Modal/refundModal'
import { RefundModal } from '.'

export default {
  title: 'RefundModal',
}

export const RefundModalPage: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(refundModalAtom, MOCK_DONATION)}
  >
    <RefundModal />
  </RecoilRoot>
)
