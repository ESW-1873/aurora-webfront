import React, { VFC } from 'react'
import {
  CANCEL_TEXT,
  DONATION_TEXT,
  FEE_TEXT,
  FOR_FUNDRAISERS_TEXT_1,
  FOR_FUNDRAISERS_TEXT_2,
  REFUND_REQUEST_TEXT,
  WHAT_IS_AURORA_TEXT,
} from 'src/data/top'
import { Link } from 'src/elements/Link'
import { primaryColor, white } from 'src/styles/colors'
import { fontWeightBold, fontWeightSemiBold } from 'src/styles/font'
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
          </div>
          <div>
            <h2>For Fundraisers</h2>
            <p>
              {FOR_FUNDRAISERS_TEXT_1}
              <Link href={RAISE}>
                <a>Get Started</a>
              </Link>
              {FOR_FUNDRAISERS_TEXT_2}
            </p>
            <ul>
              <li>Passed 72 hours since published.</li>
              <li>Got 100,000 donations.</li>
            </ul>
            <p>
              Note: Publisher must understand{' '}
              <a target="_blank" href={DISCLAIMER} rel="noreferrer">
                Disclaimer
              </a>
              .
            </p>
          </div>
          <div>
            <h2>For Donor</h2>
            <h3>Donation</h3>
            <p>{DONATION_TEXT}</p>
            <h3>Cancel</h3>
            <p>{CANCEL_TEXT}</p>
            <h3>Refund request</h3>
            <p>{REFUND_REQUEST_TEXT}</p>
          </div>
          <div>
            <h2>Fee</h2>
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
      font-size: 18px;
      margin-bottom: 8px;
    }
    p {
      margin-bottom: 24px;
    }
    ul {
      font-size: 16px;
    }
  }
`
