import { SITE_SEO_DATA } from 'src/constants/seo'

export const isProd = Boolean(process.env.NEXT_PUBLIC_IS_PROD)
export const IS_STORYBOOK = Boolean(process.env.STORYBOOK)

export const HOSTNAME = isProd
  ? SITE_SEO_DATA.siteDomain
  : process.env.NEXT_PUBLIC_VERCEL_URL || 'dev.auroradao.org'

export const ROOT_URL = `https://${HOSTNAME}`

export const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  'https://api.studio.thegraph.com/query/2636/auroradao/v0.0.19'

export const POST_API_ENDPOINT =
  process.env.NEXT_PUBLIC_POST_API_ENDPOINT || 'https://api.auroradao-dev.tk'
