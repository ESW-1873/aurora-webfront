import React, { ReactNode, VFC } from 'react'
import { Footer } from 'src/components/Footer'
import { AppHeader, Header } from 'src/components/Header'
import { SEO, SEOProps } from 'src/components/SEO'
import { pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'
import { HeroHeader } from '../Top/HeroHeader'

export const PageWrapper: VFC<
  { children: ReactNode; className?: string } & SEOProps
> = ({ children, className, ...seoProps }) => (
  <>
    <SEO {...seoProps} />
    <Header />
    <HeroHeader />
    <Layout className={className}>
      <main>{children}</main>
    </Layout>
    <Footer />
  </>
)

export const AppPageWrapper: VFC<
  { children: ReactNode; className?: string } & SEOProps
> = ({ children, className, ...seoProps }) => (
  <>
    <SEO {...seoProps} />
    <Layout className={className}>
      <AppHeader />
      {children}
    </Layout>
    <Footer />
  </>
)

const Layout = styled.div`
  ${pageGuide};
  margin: 0 auto;
  height: 100%;
  width: 100%;
`
