import { HOSTNAME } from './env'

export const SERVICE_URL = `https://${HOSTNAME}`
// TODO: 10/1になったらaboutを削除してrootに戻す
export const TOP = '/about'
// export const TOP = '/'
export const DISCLAIMER = '/disclaimer'
export const RAISE = '/raise'

export const METAMASK_URL = 'https://metamask.io/'
export const ETHERSCAN_URL = 'https://etherscan.io/'
export const POLYGONSCAN_URL = 'https://polygonscan.com/'

export const postPage = (id: string, options?: Partial<{ fullUrl: boolean }>) =>
  options?.fullUrl ? `${SERVICE_URL}/${id}` : `/${id}`

export const extractPathname = (path: string = '') => path.split(/[?#]/)[0]
