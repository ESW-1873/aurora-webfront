import { ReactNode, VFC } from 'react'
import { IconSettings } from 'src/assets/svgs'
import { Link } from 'src/elements/Link'
import { black, purple, white } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { APP, APP_STAKE } from 'src/utils/router'
import styled, { css } from 'styled-components'

type NavigationProps = {
  currentPath: string
  address: string
}
export const Navigation: VFC<NavigationProps> = ({ currentPath, address }) => (
  <Layout>
    <LeftMenu>
      <MenuItem href={APP} currentPath={currentPath}>
        Dashboard
      </MenuItem>
      <MenuItem href={APP_STAKE} currentPath={currentPath}>
        Stake
      </MenuItem>
      <MenuItem currentPath={currentPath}>SocialGraph</MenuItem>
      <MenuItem currentPath={currentPath}>Voting</MenuItem>
    </LeftMenu>
    <RightMenu>
      <Address>{address}</Address>
      <IconSettings />
    </RightMenu>
  </Layout>
)

const MenuItem: VFC<{
  currentPath: string
  children: ReactNode
  href?: string
}> = ({ currentPath, href, children }) => (
  <Item href={href} isCurrent={href === currentPath}>
    {children}
  </Item>
)

const Layout = styled.nav`
  margin-left: 48px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Address = styled.p`
  background-color: ${purple};
  color: ${white};
  font-size: 16px;
  font-weight: ${fontWeightMedium};
  letter-spacing: 0.016em;
  border-radius: 16px;
  width: 132px;
  padding: 9px 16px 6px;
`
const LeftMenu = styled.div`
  display: flex;
  margin-left: -40px;
  > * {
    margin-left: 40px;
  }
`
const RightMenu = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-left: 16px;
  }
`

const currentLinkStyle = css`
  color: ${purple};
  position: relative;
  ::before {
    content: '';
    position: absolute;
    bottom: -20px;
    left: -12px;
    right: -12px;
    border-bottom: 1px solid ${black};
  }
  ::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    border-bottom: 2px solid ${purple};
  }
`
const Item = styled(Link)<{ isCurrent: boolean }>`
  font-size: 16px;
  font-weight: ${fontWeightMedium};
  letter-spacing: 0.016em;
  ${({ isCurrent }) => isCurrent && currentLinkStyle}
`
