import { SITE_SEO_DATA } from 'src/constants/seo'

export const isProd = Boolean(process.env.NEXT_PUBLIC_IS_PROD)

export const HOSTNAME = isProd
  ? SITE_SEO_DATA.siteDomain
  : process.env.NEXT_PUBLIC_VERCEL_URL || 'dev.auroradao.org'

export const ROOT_URL = `https://${HOSTNAME}`

export const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT ||
  'https://api.studio.thegraph.com/query/2636/auroradao/v0.0.4'
