import { VFC } from 'react'
import { BlurBackedButton } from 'src/components/Buttons'
import { Logo } from 'src/components/Logo'
import { black } from 'src/styles/colors'
import styled from 'styled-components'

export const Header: VFC = () => (
  <>
    <HeaderOverlay />
    <HeaderLayout>
      <Logo />
      <BlurBackedButton label="Enter App" />
    </HeaderLayout>
    Hello, hologram!
  </>
)

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(${black}, ${black}00);
`
const HeaderLayout = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  height: 120px;
`
