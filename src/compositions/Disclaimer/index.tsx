import React, { VFC } from 'react'
import { FOOTER_SRC } from 'src/assets/images'
import { DISCLAIMER_TEXT } from 'src/data/disclaimer'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { PageWrapper } from '../PageWrapper'

export const Disclaimer: VFC = () => (
  <>
    <PageWrapper pageTitle="Disclaimer" backgroundImage={FOOTER_SRC}>
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
  h2 {
    margin-bottom: 32px;
  }
  @media ${breakpoint.m} {
    h2 {
      margin-bottom: 24px;
    }
  }
`
