import Link from 'next/link'
import React from 'react'
import { IconGithub, IconMedium, IconNote, IconTwitter } from 'src/assets/svgs'
import { Logo } from 'src/components/Logo'
import { footer, gray } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightLight,
  fontWeightRegular,
} from 'src/styles/font'
import { pageGuide } from 'src/styles/mixins'
import {
  DISCLAIMER,
  TEAM_DESIGNERS,
  TEAM_DEVELOPERS,
  TEAM_INVESTORS,
  TEAM_PROMOTERS,
} from 'src/utils/router'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <>
      <FooterLayout>
        <FooterWrapper>
          <CompanyInfoArea>
            <Logo />
            <ConpanyDescription>
              {
                'Hologram is Decentralized Credit Protocol, which is organized by HologramDAO.\nJoin us!'
              }
            </ConpanyDescription>
            <SnsIconList>
              <a
                href="https://twitter.com/_bridges_inc"
                target="_blank"
                rel="noreferrer"
              >
                <IconTwitter />
              </a>
              <a className="disabled">
                <IconMedium />
              </a>
              <a className="disabled">
                <IconNote />
              </a>
              <a className="disabled">
                <IconGithub />
              </a>
            </SnsIconList>
          </CompanyInfoArea>
          <LinkListLayout>
            <LinkListCategory>
              <LinkHeading>PRODUCTS</LinkHeading>
              <LinkList>
                <Link href={DISCLAIMER} passHref>
                  <LinkItem>Disclaimer</LinkItem>
                </Link>
                <LinkItem className="disabled">White Paper</LinkItem>
                <LinkItem className="disabled">API</LinkItem>
              </LinkList>
            </LinkListCategory>
            <LinkListCategory>
              <LinkHeading>TEAM</LinkHeading>
              <LinkList>
                <Link href={TEAM_DEVELOPERS} passHref>
                  <LinkItem>Developers</LinkItem>
                </Link>
                <Link href={TEAM_DESIGNERS} passHref>
                  <LinkItem>Designers</LinkItem>
                </Link>
                <Link href={TEAM_INVESTORS} passHref>
                  <LinkItem>Investors</LinkItem>
                </Link>
                <Link href={TEAM_PROMOTERS} passHref>
                  <LinkItem>Promoters</LinkItem>
                </Link>
              </LinkList>
            </LinkListCategory>
          </LinkListLayout>
        </FooterWrapper>
      </FooterLayout>
    </>
  )
}

const LinkItem = styled.a`
  font-weight: ${fontWeightLight};
  margin-top: 22px;
  width: 100%;
`

const LinkHeading = styled.h4`
  font-weight: ${fontWeightBold};
`

const LinkList = styled.div`
  max-height: 158px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media screen and (max-width: 959px) {
    max-height: unset;
  }
`

const LinkListCategory = styled.div`
  min-width: 154px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`

const LinkListLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -40px;
  margin-right: -24px;
  > * {
    margin-right: 24px;
  }
  @media screen and (max-width: 480px) {
    margin-right: -20px;
    > * {
      margin-right: 20px;
    }
  }
`

const SnsIconList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin-right: -24px;
  > * {
    margin-right: 24px;
  }
  @media screen and (max-width: 480px) {
    margin-right: -20px;
    > * {
      margin-right: 20px;
    }
  }
`
const ConpanyDescription = styled.p`
  font-weight: ${fontWeightRegular};
  margin-top: 18px;
  white-space: pre-wrap;
`

const CompanyInfoArea = styled.div`
  flex: 1;
  margin-bottom: 40px;
  margin-right: 64px;
  max-width: 350px;
  min-width: 216px;
`

const FooterWrapper = styled.div`
  padding: max(80px, 2%) 0;
  ${pageGuide};
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  line-height: 1.5;
  letter-spacing: 0.016em;
  a.disabled {
    pointer-events: none;
    color: ${gray};
    svg {
      fill: ${gray};
    }
  }
`

const FooterLayout = styled.footer`
  background-color: ${footer};
`
