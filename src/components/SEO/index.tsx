import {
  SEO as ReactSEO,
  SEOProps as ReactSEOProps,
} from '@bridges-inc/next-seo'
import { VFC } from 'react'
import { SITE_SEO_DATA } from 'src/constants/seo'
import { ROOT_URL } from 'src/utils/env'

export type SEOProps = ReactSEOProps

export const SEO: VFC<ReactSEOProps> = ({
  siteUrl,
  siteTitle,
  author,
  image,
  ...props
}) => (
  <ReactSEO
    siteUrl={siteUrl || ROOT_URL}
    siteTitle={siteTitle || SITE_SEO_DATA.siteTitle}
    author={author || SITE_SEO_DATA.author}
    image={image || SITE_SEO_DATA.image}
    {...props}
  />
)
