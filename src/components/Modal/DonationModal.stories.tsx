import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedWalletModalAtom } from 'src/stores/Modal/walletModal'
import { GlobalStyles } from 'src/styles/global-styles'
import { DonationModal } from './DonationModal'

export default {
  title: 'DonationModal',
}

const MOCK_TOTAL_DONATION = 12.32344

export const Content: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedWalletModalAtom, true)}
  >
    <GlobalStyles />
    <DonationModal totalDonation={MOCK_TOTAL_DONATION} />
  </RecoilRoot>
)
