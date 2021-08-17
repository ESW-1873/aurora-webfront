import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedRefundRequestModalAtom } from 'src/stores/Modal/refundRequestModal'
import { GlobalStyles } from 'src/styles/global-styles'
import { RefundRequestModal } from './RefundRequestModal'

export default {
  title: 'RefundRequestModal',
}

export const Content: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedRefundRequestModalAtom, true)}
  >
    <GlobalStyles />
    <RefundRequestModal />
  </RecoilRoot>
)
