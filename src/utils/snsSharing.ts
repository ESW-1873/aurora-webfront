export const shareWithTwitterUrl = (message: string, url: string) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${message}\r\n${url}\r\n#AuroraCard @AuroraCard_`,
  )}`
