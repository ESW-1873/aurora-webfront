import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedRefundRequestModalAtom } from 'src/stores/Modal/refundRequestModal'
import { RefundRequestModal } from './RefundRequestModal'

export default {
  title: 'RefundRequestModal',
}

const MOCK_REFUNDABLE_AMOUNT = '3.42432'

export const Content: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedRefundRequestModalAtom, true)}
  >
    <RefundRequestModal refundableAmount={MOCK_REFUNDABLE_AMOUNT} />
  </RecoilRoot>
)
