import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, VFC } from 'react'
import TagManager from 'react-gtm-module'
import { RecoilRoot } from 'recoil'
import { Favicons } from 'src/components/Favicons'
import { getLibrary } from 'src/external'
import { WalletInitializer } from 'src/initializers'
import 'src/styles/fonts.css'
import { GlobalStyles } from 'src/styles/global-styles'
import 'src/styles/globals.css'
import 'src/styles/reset.css'
import { GTM_ID, ROOT_URL } from 'src/utils/env'
import { extractPathname } from 'src/utils/router'

const MyApp: VFC<AppProps> = ({ Component, pageProps, router: { asPath } }) => {
  const pageUrl = `${ROOT_URL}${extractPathname(asPath)}`
  useEffect(() => {
    if (GTM_ID) TagManager.initialize({ gtmId: GTM_ID })
  }, [])
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <RecoilRoot>
          <WalletInitializer>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <meta property="og:url" content={pageUrl} />
              <link rel="canonical" href={pageUrl} />
            </Head>
            <Favicons />
            <GlobalStyles />
            <Component {...pageProps} />
          </WalletInitializer>
        </RecoilRoot>
      </Web3ReactProvider>
    </>
  )
}

export default MyApp
