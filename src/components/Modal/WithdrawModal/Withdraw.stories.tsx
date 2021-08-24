import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { MOCK_DONATION, MOCK_POST } from 'src/data/__mocks__'
import { withdrawModalAtom } from 'src/stores/Modal/withdrawModal'
import { WithdrawModal } from '.'

export default {
  title: 'WithdrawModal',
}

export const WithdrawModalPage: VFC = () => (
  <RecoilRoot initializeState={(snap) => snap.set(withdrawModalAtom, true)}>
    <WithdrawModal postId={MOCK_POST.id} amount={MOCK_DONATION.amount} />
  </RecoilRoot>
)
