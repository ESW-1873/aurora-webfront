import React, { VFC } from 'react'
import { DISCLAIMER_TEXT } from 'src/data/disclaimer'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { PageWrapper } from '../PageWrapper'

export const Disclaimer: VFC = () => (
  <>
    <PageWrapper
      pageTitle="Disclaimer"
      backgroundImage="/assets/images/footer.png"
    >
      <main>
        <Section>
          <h2>Disclaimer</h2>
          <p>{DISCLAIMER_TEXT}</p>
        </Section>
      </main>
    </PageWrapper>
  </>
)

const Section = styled.section`
  text-align: left;
  padding-top: 32px;
  padding-bottom: 64px;
  h2,
  > label {
    margin-bottom: 32px;
  }
  @media ${breakpoint.m} {
    padding-top: 24px;
    padding-bottom: 40px;
    h2,
    > label {
      margin-bottom: 24px;
    }
  }
`
