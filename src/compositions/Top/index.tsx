import React, { VFC } from 'react'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'
import { HeroHeader } from './HeroHeader'
import { MainSection } from './MainSection'

export const Top: VFC = () => (
  <>
    <Layout>
      <Header />
      <HeroHeader />
      <MainSection />
    </Layout>
    <Footer />
  </>
)

const Layout = styled.div`
  margin: 0 auto;
  ${pageGuide};
`
