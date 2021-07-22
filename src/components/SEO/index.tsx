import {
  SEO as ReactSEO,
  SEOProps as ReactSEOProps,
} from '@squardinc/react-seo'
import Head from 'next/head'
import { VFC } from 'react'
import { SITE_SEO_DATA } from 'src/data/common'

export type SEOProps = ReactSEOProps

export const SEO: VFC<ReactSEOProps> = ({
  siteUrl,
  siteTitle,
  author,
  image,
  ...props
}) => (
  <Head>
    <ReactSEO
      siteUrl={siteUrl || SITE_SEO_DATA.siteUrl}
      siteTitle={siteTitle || SITE_SEO_DATA.siteTitle}
      author={author || SITE_SEO_DATA.author}
      image={image || SITE_SEO_DATA.image}
      {...props}
    />
  </Head>
)
