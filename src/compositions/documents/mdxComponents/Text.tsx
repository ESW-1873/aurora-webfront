import { Heading } from 'mdast'
import { VFC } from 'react'
import { fontWeightBold, fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'

export const Paragraph = styled.p`
  margin-top: 24px;
  h2 + &,
  blockquote & {
    margin-top: 0;
  }
`

export const Strong = styled.strong`
  font-weight: ${fontWeightBold};
`

export const Heading1 = styled.h1`
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: 40px;
  font-weight: ${fontWeightBold};
  line-height: 1.275;
`

export const Heading2: VFC<Heading> = ({ children, ...props }) => (
  <StyledHeading2 {...props} id={children.toString().replace(/^[0-9]+\. /, '')}>
    {children}
  </StyledHeading2>
)
const StyledHeading2 = styled.h2`
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: ${fontWeightSemiBold};
  line-height: 1.25;
`
