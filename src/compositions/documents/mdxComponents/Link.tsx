import React, { FC } from 'react'
import { purple } from 'src/styles/colors'
import styled from 'styled-components'

type LinkProps = {
  href: string
  title?: string
  children: any
}
export const Link: FC<LinkProps> = ({ href, title, children }) => (
  <AnchorLink href={href === '#' ? `#${children}` : href} title={title}>
    {children}
  </AnchorLink>
)

const AnchorLink = styled.a`
  color: ${purple};
  text-decoration: underline;
`
