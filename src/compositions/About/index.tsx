import React, { VFC } from 'react'
import { WalletModal } from 'src/components/Modal/WalletModal'
import {
  AFTER_PROJECT_ENDS_TEXT,
  CANCEL_TEXT,
  DONATE_TEXT,
  FEE_TEXT,
  FUNDRAISERS_STEP1_TEXT_1,
  FUNDRAISERS_STEP1_TEXT_2,
  FUNDRAISERS_STEP2_TEXT,
  WHAT_IS_AURORA_TEXT,
  WITHDRAW_TEXT,
} from 'src/data/top'
import { Link } from 'src/elements/Link'
import { primaryColor, white } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightSemiBold,
} from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { DISCLAIMER, START } from 'src/utils/router'
import styled from 'styled-components'
import { PageWrapper } from '../PageWrapper'

export const About: VFC = () => (
  <>
    <StyledPageWrapper
      siteTitle="Aurora - Ultimately Fast And Easy Online Fundraising"
      description="Aurora is a decentralized collaborative giving marketplace. We are committed to open source software and building on the decentralized web."
      backgroundColor={primaryColor}
    >
      <main>
        <Section>
          <div>
            <h2>What is Aurora?</h2>
            <p>{WHAT_IS_AURORA_TEXT}</p>
            <p>
              Note: You must understand{' '}
              <a target="_blank" href={DISCLAIMER} rel="noreferrer">
                Disclaimer
              </a>
              .
            </p>
          </div>
          <div>
            <h2>1. Creating the project</h2>
            <h3>Fundraisers</h3>
            <p>
              {FUNDRAISERS_STEP1_TEXT_1}
              <Link href={START}>
                <a>Get Started</a>
              </Link>
              {FUNDRAISERS_STEP1_TEXT_2}
            </p>
            <ul id="the-end-of-project-period">
              <li>Passed 72 hours since published.</li>
              <li>Got 100,000 donations.</li>
            </ul>
          </div>
          <div>
            <h2>2. During the project</h2>
            <h3>Fundraisers</h3>
            <p>{FUNDRAISERS_STEP2_TEXT}</p>
            <h3>Donors</h3>
            <h4>Donate</h4>
            <p>{DONATE_TEXT}</p>
            <h4>Cancel</h4>
            <p>{CANCEL_TEXT}</p>
          </div>
          <div>
            <h2>3. After the project ends</h2>
            <p>{AFTER_PROJECT_ENDS_TEXT}</p>
            <h3>Fundraisers</h3>
            <h4>Withdraw</h4>
            <p>{WITHDRAW_TEXT}</p>
          </div>
          <div>
            <h2>4. Fee</h2>
            <p>{FEE_TEXT}</p>
          </div>
        </Section>
      </main>
    </StyledPageWrapper>
    <WalletModal />
  </>
)

const StyledPageWrapper = styled(PageWrapper)`
  background: ${white};
`

const Section = styled.section`
  text-align: left;
  div {
    margin-bottom: 64px;
  }
  h2 {
    margin-bottom: 32px;
  }
  h3 {
    margin-bottom: 18px;
    font-size: 36px;
    font-weight: ${fontWeightSemiBold};
  }
  h4 {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: ${fontWeightMedium};
  }
  p {
    margin-bottom: 24px;
  }
  a {
    font-weight: ${fontWeightBold};
    text-decoration: underline;
  }
  ul {
    font-size: 20px;
    margin-bottom: 24px;
    > li {
      list-style: none;
      background-image: url('assets/svgs/aurora.svg');
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 12px;
      padding-left: 24px;
      :first-child {
        margin-bottom: 8px;
      }
    }
  }
  @media ${breakpoint.m} {
    div {
      margin-bottom: 36px;
    }
    h2 {
      margin-bottom: 18px;
    }
    h3 {
      font-size: 24px;
      margin-bottom: 12px;
    }
    h4 {
      font-size: 18px;
      margin-bottom: 6px;
    }
    p {
      margin-bottom: 24px;
    }
    ul {
      font-size: 16px;
    }
  }
`
