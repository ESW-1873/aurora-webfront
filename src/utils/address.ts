import { getAddress } from '@ethersproject/address'

export const isAddress = (value: any): string | false => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export const shortenAddress = (address: string, chars = 4): string => {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export const isZero = (hexNumberString: string): boolean => {
  return /^0x0*$/.test(hexNumberString)
}

export const equals = (
  a: string | null | undefined,
  b: string | null | undefined,
) => (a && b ? a.toLowerCase() === b.toLowerCase() : false)
