import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { MOCK_DONATION, MOCK_POST } from 'src/data/__mocks__'
import { isOpenedRefundRequestModalAtom } from 'src/stores/Modal/refundRequestModal'
import { RefundRequestModal } from '.'

export default {
  title: 'RefundRequestModal',
}

export const RefundRequestModalPage: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedRefundRequestModalAtom, true)}
  >
    <RefundRequestModal postId={MOCK_POST.id} ownDonation={MOCK_DONATION} />
  </RecoilRoot>
)
