import React, { ReactNode, VFC } from 'react'
import { BlurredBackground, PlainBackground } from 'src/components/Background'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { SEO, SEOProps } from 'src/components/SEO'
import { white } from 'src/styles/colors'
import { breakpoint, pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'

type PageWrapperProps = SEOProps & {
  children: ReactNode
  backgroundImage?: string
  backgroundColor?: string
  className?: string
  noFooter?: boolean
}
export const PageWrapper: VFC<PageWrapperProps> = ({
  children,
  backgroundImage,
  backgroundColor,
  noFooter,
  className,
  ...seoProps
}) => (
  <>
    <SEO {...seoProps} />
    {backgroundImage && <BlurredBackground imageUrl={backgroundImage} />}
    {backgroundColor && <PlainBackground backgroundColor={backgroundColor} />}
    <Layout className={className}>
      <Header />
      {children}
      {!noFooter && <Footer />}
    </Layout>
  </>
)

export const CONTENT_MAX_WIDTH = '896px'
export const Layout = styled.div`
  flex: 1;
  ${pageGuide};
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH};
  width: 100%;
  background: ${white}26;
  backdrop-filter: blur(30px) brightness(115%);
  header {
    margin-bottom: 64px;
  }
  footer {
    margin-top: 64px;
  }
  @media ${breakpoint.m} {
    header {
      margin-bottom: 0;
    }
  }
`
