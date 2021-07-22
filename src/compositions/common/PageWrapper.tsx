import React, { ReactNode, VFC } from 'react'
import { Footer } from 'src/components/Footer'
import { AppHeader, Header } from 'src/components/Header'
import { SEO, SEOProps } from 'src/components/SEO'
import { pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'

export const PageWrapper: VFC<{ children: ReactNode } & SEOProps> = ({
  children,
  ...seoProps
}) => (
  <>
    <SEO {...seoProps} />
    <Layout>
      <Header />
      {children}
    </Layout>
    <Footer />
  </>
)

export const AppPageWrapper: VFC<{ children: ReactNode } & SEOProps> = ({
  children,
}) => (
  <>
    <SEO />
    <Layout>
      <AppHeader />
      {children}
    </Layout>
    <Footer />
  </>
)

const Layout = styled.div`
  margin: 0 auto;
  ${pageGuide};
  height: 100%;
`
