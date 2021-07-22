import { SITE_SEO_DATA } from 'src/data/common'

export const isProd = Boolean(process.env.NEXT_PUBLIC_IS_PROD)

export const HOSTNAME = isProd
  ? SITE_SEO_DATA.siteDomain
  : process.env.NEXT_PUBLIC_VERCEL_URL || 'dev.hologramdao.com'

export const ROOT_URL = `https://${HOSTNAME}`
