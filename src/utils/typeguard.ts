export const isClient = () => typeof window !== 'undefined'

export const isString = (arg: any): arg is string => typeof arg === 'string'
