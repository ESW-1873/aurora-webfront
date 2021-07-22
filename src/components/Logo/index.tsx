import { VFC } from 'react'
import { Logo as LogoSVG, Title } from 'src/assets/svgs'
import styled from 'styled-components'

export const Logo: VFC<{ iconOnly?: boolean }> = ({ iconOnly }) => (
  <LogoDiv>
    <LogoSVG />
    {!iconOnly && <Title />}
  </LogoDiv>
)

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 16px;
  }
`
