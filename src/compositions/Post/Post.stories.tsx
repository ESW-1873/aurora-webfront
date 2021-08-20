import React from 'react'
import { MOCK_DONATION, MOCK_POST } from 'src/data/__mocks__'
import { Post } from '.'

export default {
  title: 'Post',
}

export const WalletDisconnectedPage = () => <Post postProps={MOCK_POST} />

export const CancelablePage = () => (
  <Post postProps={MOCK_POST} ownDonation={MOCK_DONATION} />
)

export const RefundablePage = () => (
  <Post
    postProps={{ ...MOCK_POST, hasClosed: true }}
    ownDonation={MOCK_DONATION}
  />
)

export const DoneePage = () => (
  <Post postProps={MOCK_POST} ownDonation={MOCK_DONATION} isDonee />
)
