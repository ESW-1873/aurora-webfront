import React, { VFC } from 'react'
import { DISCLAIMER_TEXT } from 'src/data/disclaimer'
import { primaryColor, white } from 'src/styles/colors'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { PageWrapper } from '../PageWrapper'

export const Disclaimer: VFC = () => (
  <>
    <StyledPageWrapper pageTitle="Disclaimer" backgroundColor={primaryColor}>
      <main>
        <Section>
          <h2>Disclaimer</h2>
          <p>{DISCLAIMER_TEXT}</p>
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
  h2 {
    margin-bottom: 32px;
  }
  @media ${breakpoint.m} {
    h2 {
      margin-bottom: 24px;
    }
  }
`
