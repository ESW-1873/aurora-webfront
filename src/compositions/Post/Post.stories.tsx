import React from 'react'
import { MOCK_DONATION, MOCK_POST } from 'src/data/__mocks__'
import { Post } from '.'

export default {
  title: 'Post',
}

export const TopPage = () => (
  <Post postProps={MOCK_POST} ownDonation={MOCK_DONATION} />
)
