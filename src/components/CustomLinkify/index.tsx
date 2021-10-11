import { VFC } from 'react'
import Linkify from 'react-linkify'

export const CustomLinkify: VFC<{ text: string }> = ({ text }) => (
  <p>
    <Linkify componentDecorator={componentDecorator}>{text}</Linkify>
  </p>
)

const componentDecorator = (href: string, text: string, key: number) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)
