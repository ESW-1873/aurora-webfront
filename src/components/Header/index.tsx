import { useRouter } from 'next/dist/client/router'
import React, { ReactNode, VFC } from 'react'
import { HeaderButton } from 'src/components/Buttons'
import { Logo } from 'src/components/Logo'
import { Link } from 'src/elements/Link'
import { useWalletModalStore } from 'src/stores'
import { headerHeight } from 'src/styles/mixins'
import { APP, TOP } from 'src/utils/router'
import { ellipsizeMid } from 'src/utils/string'
import styled from 'styled-components'
import { Navigation } from './Navigation'

const HeaderWrapper: VFC<{ children: ReactNode } & HeaderLayoutStyleProps> = ({
  children,
  withBorder,
}) => (
  <>
    <HeaderLayout withBorder={withBorder}>{children}</HeaderLayout>
  </>
)
export const Header: VFC = () => {
  const { open: openWalletModal } = useWalletModalStore()

  return (
    <>
      <HeaderWrapper>
        <Link href={TOP}>
          <Logo />
        </Link>
        <HeaderButton label="Connect Wallet" onClick={openWalletModal} />
      </HeaderWrapper>
    </>
  )
}

export const AppHeader: VFC = () => {
  const { pathname } = useRouter()
  // TODO fetch from context
  const address = ellipsizeMid('0xfa3jxxxxxxxxxxxxxxoxa2', 6, 4)
  return (
    <HeaderWrapper withBorder>
      <Link href={APP}>
        <Logo iconOnly />
      </Link>
      <Navigation currentPath={pathname} address={address} />
    </HeaderWrapper>
  )
}

type HeaderLayoutStyleProps = { withBorder?: boolean }
const HeaderLayout = styled.header<HeaderLayoutStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${headerHeight};
`
