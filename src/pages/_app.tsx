import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { publicApiClient } from 'src/api/client'
import { Favicons } from 'src/components/Favicons'
import { getLibrary } from 'src/external'
import { WalletInitializer } from 'src/initializers'
import 'src/styles/fonts.css'
import { GlobalStyles } from 'src/styles/global-styles'
import 'src/styles/globals.css'
import 'src/styles/reset.css'
import { ROOT_URL } from 'src/utils/env'
import { extractPathname } from 'src/utils/router'
import { Provider as UrqlProvider } from 'urql'

const MyApp: VFC<AppProps> = ({ Component, pageProps, router: { asPath } }) => {
  const pageUrl = `${ROOT_URL}${extractPathname(asPath)}`
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <RecoilRoot>
          <WalletInitializer>
            <UrqlProvider value={publicApiClient()}>
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
            </UrqlProvider>
          </WalletInitializer>
        </RecoilRoot>
      </Web3ReactProvider>
    </>
  )
}

export default MyApp
