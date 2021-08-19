export const ellipsizeMid = (str: string, left: number, right: number) =>
  `${str.slice(0, left)}...${str.slice(-right)}`

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}
