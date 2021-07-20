import React, { VFC } from 'react'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { MOCK_PROMOTERS } from 'src/data/Team'
import { pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'
import { TeamPageLayout } from '../components/TeamPageLayout'

export const Promoters: VFC = () => (
  <>
    <Layout>
      <Header />
      <TeamPageLayout
        pageTitle="Promoters"
        pageDescription="Since people trust that the value of a dollar will remain the same,
        money is deemed as credit. After that, credit was controlled by an
        institution in an algorithmic way. Finally, the time will come when
        credit will be democratized."
        teamType="Promotion"
        message="We are looking for talented people to join our team!"
        members={MOCK_PROMOTERS}
      />
    </Layout>
    <Footer />
  </>
)

const Layout = styled.div`
  margin: 0 auto;
  ${pageGuide};
`
