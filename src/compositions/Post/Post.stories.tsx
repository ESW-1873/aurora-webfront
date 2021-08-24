import React from 'react'
import { PostContent } from 'src/api/types'
import {
  MOCK_DONATION,
  MOCK_POST,
  MOCK_REFUND_REQUESTS,
} from 'src/data/__mocks__'
import { Post } from '.'

export default {
  title: 'Post',
}

// @ts-ignore
const refetch: () => Promise<PostContent> = () => {}

export const WalletDisconnectedPage = () => (
  <Post postProps={MOCK_POST} refetch={refetch} />
)

export const CancelablePage = () => (
  <Post postProps={MOCK_POST} ownDonation={MOCK_DONATION} refetch={refetch} />
)

export const RefundablePage = () => (
  <Post
    postProps={{
      ...MOCK_POST,
      hasClosed: true,
      refundRequests: MOCK_REFUND_REQUESTS,
    }}
    ownDonation={MOCK_DONATION}
    refetch={refetch}
  />
)

export const DoneePage = () => (
  <Post
    postProps={MOCK_POST}
    ownDonation={MOCK_DONATION}
    isDonee
    refetch={refetch}
  />
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
    refetch={refetch}
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
    refetch={refetch}
  />
)
