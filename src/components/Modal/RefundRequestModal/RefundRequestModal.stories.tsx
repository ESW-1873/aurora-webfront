import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { MOCK_DONATION } from 'src/data/__mocks__'
import { isOpenedRefundRequestModalAtom } from 'src/stores/Modal/refundRequestModal'
import { RefundRequestModal } from '.'

export default {
  title: 'RefundRequestModal',
}

const MOCK_REFUNDABLE_AMOUNT = '40000000000000000'

export const RefundRequestModalPage: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedRefundRequestModalAtom, true)}
  >
    <RefundRequestModal ownDonation={MOCK_DONATION} />
  </RecoilRoot>
)
