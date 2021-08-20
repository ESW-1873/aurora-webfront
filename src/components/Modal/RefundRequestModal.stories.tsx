import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedRefundRequestModalAtom } from 'src/stores/Modal/refundRequestModal'
import { RefundRequestModal } from './RefundRequestModal'

export default {
  title: 'RefundRequestModal',
}

const MOCK_REFUNDABLE_AMOUNT = '40000000000000000'

export const RefundRequestModalPage: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedRefundRequestModalAtom, true)}
  >
    <RefundRequestModal refundableAmount={MOCK_REFUNDABLE_AMOUNT} />
  </RecoilRoot>
)
