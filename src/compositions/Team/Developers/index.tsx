import React, { VFC } from 'react'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { MOCK_DEVELOPERS } from 'src/data/Team'
import { pageGuide } from 'src/styles/mixins'
import styled from 'styled-components'
import { TeamPageLayout } from '../components/TeamPageLayout'

export const Developers: VFC = () => (
  <>
    <Layout>
      <Header />
      <TeamPageLayout
        pageTitle="Developers"
        pageDescription="Since people trust that the value of a dollar will remain the same,
        money is deemed as credit. After that, credit was controlled by an
        institution in an algorithmic way. Finally, the time will come when
        credit will be democratized."
        teamType="Development"
        message="We are looking for talented people to join our team!"
        members={MOCK_DEVELOPERS}
      />
    </Layout>
    <Footer />
  </>
)

const Layout = styled.div`
  margin: 0 auto;
  ${pageGuide};
`
