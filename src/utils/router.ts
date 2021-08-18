import { HOSTNAME } from './env'

export const SERVICE_URL = `https://${HOSTNAME}`
export const DISCLAIMER = '/disclaimer'
export const RAISE = '/raise'

export const METAMASK_URL = 'https://metamask.io/'
export const ETHERSCAN_URL = 'https://etherscan.io/'

export const postPage = (id: string, options?: Partial<{ fullUrl: boolean }>) =>
  options?.fullUrl ? `${SERVICE_URL}/${id}` : `/${id}`
