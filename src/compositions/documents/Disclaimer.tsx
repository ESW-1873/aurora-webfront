import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { PageWrapper } from 'src/compositions/common/PageWrapper'
import DisclaimerMd from 'src/data/documents/disclaimer.md'
import styled from 'styled-components'
import { components } from './mdxComponents'
import { documentBaseStyles } from './styles'

export const Disclaimer = () => (
  <StyledPageWrapper pageTitle="Disclaimer" description="">
    <MDXProvider components={components}>
      <DisclaimerMd />
    </MDXProvider>
  </StyledPageWrapper>
)

const StyledPageWrapper = styled(PageWrapper)`
  min-height: 70vh;
  ${documentBaseStyles};
`
