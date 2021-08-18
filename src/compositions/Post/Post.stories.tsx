import React from 'react'
import { RecoilRoot } from 'recoil'
import { GlobalStyles } from 'src/styles/global-styles'
import { Post } from '.'

export default {
  title: 'Post',
}

export const TopPage = () => (
  <>
    <RecoilRoot>
      <GlobalStyles />
      <Post />
    </RecoilRoot>
  </>
)
