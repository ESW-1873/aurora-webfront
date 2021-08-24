import React from 'react'
import {
  MOCK_DONATION,
  MOCK_POST,
  MOCK_REFUND_REQUESTS,
} from 'src/data/__mocks__'
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
    postProps={{
      ...MOCK_POST,
      hasClosed: true,
      refundRequests: MOCK_REFUND_REQUESTS,
    }}
    ownDonation={MOCK_DONATION}
  />
)

export const DoneePage = () => (
  <Post postProps={MOCK_POST} ownDonation={MOCK_DONATION} isDonee />
)

export const RefundingPage = () => (
  <Post
    postProps={{
      ...MOCK_POST,
      hasClosed: true,
      refundRequests: MOCK_REFUND_REQUESTS,
    }}
    ownDonation={MOCK_DONATION}
    isDonee
  />
)

export const ClosedPage = () => (
  <Post
    postProps={{
      ...MOCK_POST,
      title: '',
      description: '',
      keyVisual: '',
      hasClosed: true,
      hasWithdrawn: true,
    }}
    ownDonation={MOCK_DONATION}
  />
)
