import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedWalletModalAtom } from 'src/stores/Modal/walletModal'
import { GlobalStyles } from 'src/styles/global-styles'
import { DonationModal } from './DonationModal'

export default {
  title: 'DonationModal',
}

export const Content: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedWalletModalAtom, true)}
  >
    <GlobalStyles />
    <DonationModal />
  </RecoilRoot>
)
