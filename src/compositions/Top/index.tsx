import { VFC } from 'react'
import { Header } from 'src/components/Header'
import { pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'

export const Top: VFC = () => (
  <Layout>
    <Header />
    Hello, hologram!
  </Layout>
)

const Layout = styled.div`
  margin: 0 auto;
  ${pageGuide};
`
