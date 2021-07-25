import React, { VFC } from 'react'
import { PageWrapper } from 'src/compositions/common/PageWrapper'
import { MOCK_DESIGNERS } from 'src/data/Team'
import { TeamPageLayout } from '../components/TeamPageLayout'

export const Designers: VFC = () => (
  <>
    <PageWrapper>
      <TeamPageLayout
        pageTitle="Designers"
        pageDescription="Since people trust that the value of a dollar will remain the same,
        money is deemed as credit. After that, credit was controlled by an
        institution in an algorithmic way. Finally, the time will come when
        credit will be democratized."
        teamType="Design"
        message="We are looking for talented people to join our team!"
        members={MOCK_DESIGNERS}
      />
    </PageWrapper>
  </>
)
