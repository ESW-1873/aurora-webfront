import React, { VFC } from 'react'
import {
  AFTER_PROJECT_ENDS_TEXT,
  CANCEL_TEXT,
  DONATION_TEXT,
  FEE_TEXT,
  FUNDRAISERS_STEP1_TEXT_1,
  FUNDRAISERS_STEP1_TEXT_2,
  FUNDRAISERS_STEP2_TEXT,
  REFUND_REQUEST_TEXT,
  REFUND_TEXT,
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
import { DISCLAIMER, RAISE } from 'src/utils/router'
import styled from 'styled-components'
import { PageWrapper } from '../PageWrapper'

export const Top: VFC = () => (
  <>
    <StyledPageWrapper pageTitle="Top" backgroundColor={primaryColor}>
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
              <Link href={RAISE}>
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
            <h3>Donor</h3>
            <h4>Donation</h4>
            <p>{DONATION_TEXT}</p>
            <h4>Cancel</h4>
            <p>{CANCEL_TEXT}</p>
          </div>
          <div>
            <h2>3. After the project ends</h2>
            <p>{AFTER_PROJECT_ENDS_TEXT}</p>
            <h3>Fundraisers</h3>
            <h4>Refund</h4>
            <p>{REFUND_TEXT}</p>
            <h4>Withdraw</h4>
            <p>{WITHDRAW_TEXT}</p>
            <h3>Donor</h3>
            <h4>Request Refund</h4>
            <p>{REFUND_REQUEST_TEXT}</p>
          </div>
          <div>
            <h2>4. Fee</h2>
            <p>{FEE_TEXT}</p>
          </div>
        </Section>
      </main>
    </StyledPageWrapper>
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
      margin-bottom: 10px;
    }
    h4 {
      font-size: 18px;
    }
    p {
      margin-bottom: 24px;
    }
    ul {
      font-size: 16px;
    }
  }
`
