import NextImage, { ImageProps as NextImageProps } from 'next/image'
import React, { ReactText, VFC } from 'react'

export type ImageInfo = {
  src: string
  alt: string
  title?: string
  objectPosition?: ReactText
}
type ImageProps = ImageInfo & Partial<NextImageProps>

export const Image: VFC<ImageProps> = ({ src, alt, ...props }) => {
  if (!src) return <></>
  return (
    // @ts-ignore
    <NextImage layout="fill" objectFit="cover" src={src} alt={alt} {...props} />
  )
}
