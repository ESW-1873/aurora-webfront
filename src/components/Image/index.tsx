import NextImage, { ImageProps as NextImageProps } from 'next/image'
import React, { ReactText, VFC } from 'react'
import { absoluteFill } from 'src/styles/mixins'
import styled from 'styled-components'

export type ImageInfo = {
  src: string
  alt: string
  title?: string
  objectPosition?: ReactText
}
type ImageProps = ImageInfo & Partial<NextImageProps>

export const Image: VFC<ImageProps> = ({ src, alt, ...props }) => {
  if (!src) return <></>
  if (!src.startsWith('http'))
    return <PreviewImage src={src} alt={alt} {...props} />
  return (
    // @ts-ignore
    <NextImage layout="fill" objectFit="cover" src={src} alt={alt} {...props} />
  )
}

const PreviewImage = styled.img`
  ${absoluteFill};
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 0px;
  height: 0px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;

  object-fit: cover;
`
