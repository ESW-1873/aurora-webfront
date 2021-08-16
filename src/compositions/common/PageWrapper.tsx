import React, { ReactNode, VFC } from 'react'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { Image } from 'src/components/Image'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEO, SEOProps } from 'src/components/SEO'
import { inset0, pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'

export const PageWrapper: VFC<
  { children: ReactNode; className?: string } & SEOProps
> = ({ children, className, ...seoProps }) => (
  <>
    <SEO {...seoProps} />
    <WalletModal />
    <Layout className={className}>
      <Header />
    </Layout>
    <ContentWrapper className={className}>{children}</ContentWrapper>
    <Footer />
  </>
)

const ContentWrapper: VFC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <>
    <BluredBackgroundArea>
      <Image src="/assets/images/top.png" alt="keyvisual" />
      <BlurOverlay />
    </BluredBackgroundArea>
    <Layout className={className}>
      <main>{children}</main>
    </Layout>
  </>
)

const BluredBackgroundArea = styled.div`
  ${inset0};
  overflow: hidden;
  z-index: -1;
  img {
    opacity: 0.7;
    size: auto;
  }
`
const BlurOverlay = styled.div`
  ${inset0};
  backdrop-filter: blur(6px);
`

export const Layout = styled.div`
  ${pageGuide};
  margin: 0 auto;
  max-width: 896px;
  width: 100%;
  padding: 0 80px;
  backdrop-filter: brightness(115%);
`
