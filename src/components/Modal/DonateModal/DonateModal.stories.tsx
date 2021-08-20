import React from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedDonateModalAtom } from 'src/stores/Modal/donateModal'
import { DonateModal } from '.'

export default {
  title: 'DonateModal',
}

const MOCK_POST_ID = '0xe6a8b2b83a40'
const MOCK_TOTAL_DONATION = '12230000000000000'

export const DonateModalPage = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedDonateModalAtom, true)}
  >
    <DonateModal postId={MOCK_POST_ID} totalDonation={MOCK_TOTAL_DONATION} />
  </RecoilRoot>
)
