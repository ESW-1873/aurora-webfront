import React, { ReactNode, VFC } from 'react'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { Image } from 'src/components/Image'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEO, SEOProps } from 'src/components/SEO'
import { MOCK_POST } from 'src/constants/tmp/post'
import { white } from 'src/styles/colors'
import { absoluteFill, breakpoint, pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'

export const PageWrapper: VFC<{ children: ReactNode } & SEOProps> = ({
  children,
  ...seoProps
}) => (
  <>
    <SEO {...seoProps} />
    <WalletModal />
    <BluredBackgroundArea>
      <Image src={MOCK_POST.image} alt="keyvisual" />
      <BlurOverlay />
    </BluredBackgroundArea>
    <Layout>
      <Header />
      {children}
    </Layout>
    <Footer />
  </>
)

const BluredBackgroundArea = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
  padding-top: 66.7%;
  @media ${breakpoint.m} {
    display: none;
  }
`

const BlurOverlay = styled.div`
  ${absoluteFill}
  background: ${white}0d;
  backdrop-filter: blur(8px) brightness(105%);
`

export const Layout = styled.div`
  ${pageGuide};
  margin: 0 auto;
  max-width: 896px;
  width: 100%;
  padding-bottom: 64px;
  background: ${white}26;
  backdrop-filter: blur(30px) brightness(115%);
`
