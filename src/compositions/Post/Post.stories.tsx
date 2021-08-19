import React from 'react'
import { MOCK_POST } from 'src/constants/tmp/post'
import { Post } from '.'

export default {
  title: 'Post',
}

export const TopPage = () => <Post postProps={MOCK_POST} donatedAmount="1" />
