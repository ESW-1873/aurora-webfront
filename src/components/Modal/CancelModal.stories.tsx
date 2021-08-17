import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedCancelModalAtom } from 'src/stores/Modal/cancelModal'
import { GlobalStyles } from 'src/styles/global-styles'
import { CancelModal } from './CancelModal'

export default {
  title: 'CancelModal',
}

export const Content: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedCancelModalAtom, true)}
  >
    <GlobalStyles />
    <CancelModal />
  </RecoilRoot>
)
