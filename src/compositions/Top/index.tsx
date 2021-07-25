import React, { VFC } from 'react'
import { PageWrapper } from '../common/PageWrapper'
import { HeroHeader } from './HeroHeader'
import { MainSection } from './MainSection'

export const Top: VFC = () => (
  <>
    <PageWrapper>
      <HeroHeader />
      <MainSection />
    </PageWrapper>
  </>
)
