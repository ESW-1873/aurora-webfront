import React, { VFC } from 'react'
import { HeaderButton } from 'src/components/Buttons'
import { Logo } from 'src/components/Logo'
import { Link } from 'src/elements/Link'
import { headerHeight } from 'src/styles/mixins'
import { TOP } from 'src/utils/router'
import styled from 'styled-components'

export const Header: VFC = () => {
  return (
    <>
      <HeaderLayout>
        <Link href={TOP}>
          <Logo />
        </Link>
        <HeaderButton label="Connect Wallet" onClick={() => {}} />
      </HeaderLayout>
    </>
  )
}

const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${headerHeight};
`
