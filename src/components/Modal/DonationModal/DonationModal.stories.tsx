import React from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedDonationModalAtom } from 'src/stores/Modal/donationModal'
import { DonationModal } from '.'

export default {
  title: 'DonationModal',
}

const MOCK_POST_ID = '0xe6a8b2b83a40'
const MOCK_TOTAL_DONATION = '12230000000000000'

export const DonationModalPage = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedDonationModalAtom, true)}
  >
    <DonationModal postId={MOCK_POST_ID} totalDonation={MOCK_TOTAL_DONATION} />
  </RecoilRoot>
)
