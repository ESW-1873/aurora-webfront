import React, { ReactNode, VFC } from 'react'
import { BlurredBackground } from 'src/components/Background'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { SEO, SEOProps } from 'src/components/SEO'
import { white } from 'src/styles/colors'
import { pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'

type PageWrapperProps = SEOProps & {
  backgroundImage: string
  children: ReactNode
}
export const PageWrapper: VFC<PageWrapperProps> = ({
  backgroundImage,
  children,
  ...seoProps
}) => (
  <>
    <SEO {...seoProps} />
    <BlurredBackground imageUrl={backgroundImage} />
    <Layout>
      <Header />
      {children}
    </Layout>
    <Footer />
  </>
)

export const Layout = styled.div`
  ${pageGuide};
  margin: 0 auto;
  max-width: 896px;
  width: 100%;
  padding-bottom: 64px;
  background: ${white}26;
  backdrop-filter: blur(30px) brightness(115%);
`
