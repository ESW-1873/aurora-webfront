import { VFC } from 'react'
import { Logo as LogoSVG, Title } from 'src/assets/svgs'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

export const Logo: VFC = () => (
  <LogoDiv>
    <LogoSVG />
    <Title />
  </LogoDiv>
)

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 16px;
  }
  @media ${breakpoint.s} {
    width: 80%;
  }
`
