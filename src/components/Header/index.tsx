import { useRouter } from 'next/dist/client/router'
import { ReactNode, VFC } from 'react'
import { BlurBackedButton } from 'src/components/Buttons'
import { Logo } from 'src/components/Logo'
import { Link } from 'src/elements/Link'
import { black } from 'src/styles/colors'
import { APP, TOP } from 'src/utils/router'
import { ellipsizeMid } from 'src/utils/string'
import styled, { css } from 'styled-components'
import { Navigation } from './Navigation'

const HeaderWrapper: VFC<{ children: ReactNode } & HeaderLayoutStyleProps> = ({
  children,
  withBorder,
}) => (
  <>
    <HeaderOverlay />
    <HeaderLayout withBorder={withBorder}>{children}</HeaderLayout>
  </>
)
export const Header: VFC = () => (
  <HeaderWrapper>
    <Link href={TOP}>
      <Logo />
    </Link>
    <BlurBackedButton onClick={() => alert('TODO')} label="Enter App" />
  </HeaderWrapper>
)

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

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(${black}, ${black}00);
`
type HeaderLayoutStyleProps = { withBorder?: boolean }
const HeaderLayout = styled.header<HeaderLayoutStyleProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  height: 120px;

  ${({ withBorder }) =>
    withBorder &&
    css`
      height: unset;
      padding: 40px 16px 8px;
      border-bottom: 1px solid;
    `}
`
