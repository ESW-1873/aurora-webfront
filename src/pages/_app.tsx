import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'src/styles/fonts.css'
import 'src/styles/globals.css'
import 'src/styles/reset.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
