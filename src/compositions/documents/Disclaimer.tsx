import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { PageWrapper } from 'src/compositions/common/PageWrapper'
import DisclaimerMd from 'src/data/documents/disclaimer.md'
import { components } from './mdxComponents'

export const Disclaimer = () => (
  <PageWrapper pageTitle="Disclaimer" description="">
    <MDXProvider components={components}>
      <DisclaimerMd />
    </MDXProvider>
  </PageWrapper>
)
