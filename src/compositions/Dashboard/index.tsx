import React, { VFC } from 'react'
import { AppPageWrapper } from 'src/compositions/common/PageWrapper'
import { pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'

export const Dashboard: VFC = () => (
  <>
    <AppPageWrapper>hello, app</AppPageWrapper>
  </>
)

const Layout = styled.div`
  margin: 0 auto;
  ${pageGuide};
`
