import Link from 'next/link'
import { VFC } from 'react'
import { BlurBackedButton } from 'src/components/Buttons'
import { Logo } from 'src/components/Logo'
import { black } from 'src/styles/colors'
import { breakpoint } from 'src/styles/mixins'
import { TOP } from 'src/utils/router'
import styled from 'styled-components'

export const Header: VFC = () => (
  <>
    <HeaderOverlay />
    <HeaderLayout>
      <Link href={TOP}>
        <a>
          <Logo />
        </a>
      </Link>
      <BlurBackedButton onClick={() => alert('TODO')} label="Enter App" />
    </HeaderLayout>
  </>
)

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(${black}, ${black}00);
  @media ${breakpoint.s} {
    height: 96px;
  }
`
const HeaderLayout = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  height: 120px;
  @media ${breakpoint.s} {
    height: 96px;
  }
`
