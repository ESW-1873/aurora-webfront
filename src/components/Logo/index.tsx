import { VFC } from 'react'
import { Logo as LogoSVG, Title } from 'src/assets/svgs'
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
`
