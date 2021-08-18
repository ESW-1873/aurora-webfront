import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedDonateModalAtom } from 'src/stores/Modal/donateModal'
import { GlobalStyles } from 'src/styles/global-styles'
import { DonationModal } from './DonationModal'

export default {
  title: 'DonationModal',
}

const MOCK_TOTAL_DONATION = 12.32344

export const Content: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedDonateModalAtom, true)}
  >
    <GlobalStyles />
    <DonationModal totalDonation={MOCK_TOTAL_DONATION} />
  </RecoilRoot>
)
