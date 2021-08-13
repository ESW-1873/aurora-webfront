import React from 'react'
import { RecoilRoot } from 'recoil'
import { GlobalStyles } from 'src/styles/global-styles'
import { Top } from '.'

export default {
  title: 'Top',
}

export const TopPage = () => (
  <>
    <RecoilRoot>
      <GlobalStyles />
      <Top />
    </RecoilRoot>
  </>
)
