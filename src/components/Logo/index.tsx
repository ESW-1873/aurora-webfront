import { VFC } from 'react'
import { Logo as LogoSVG } from 'src/assets/svgs'
import styled from 'styled-components'

export const Logo: VFC<{ iconOnly?: boolean }> = ({ iconOnly }) => (
  <LogoDiv>
    <LogoSVG />
  </LogoDiv>
)

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
`
