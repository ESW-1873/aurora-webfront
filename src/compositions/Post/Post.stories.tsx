import React from 'react'
import { MOCK_POST } from 'src/constants/tmp/post'
import { Post } from '.'

export default {
  title: 'Post',
}

export const TopPage = () => (
  <Post
    id={MOCK_POST.id}
    title={MOCK_POST.title}
    description={MOCK_POST.description}
    keyVisual={MOCK_POST.imageUrl}
  />
)
