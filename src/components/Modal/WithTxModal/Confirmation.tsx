import React, { VFC } from 'react'
import { ConnectingCircle } from 'src/assets/svgs'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { Heading, SubHeading } from '../common'

export const Confirmation: VFC = () => {
  return (
    <>
      <Layout>
        <Heading>Waiting for confirmation</Heading>
        <StyledConnectingCircle />
        <SubHeading>Confirm this transaction in your wallet</SubHeading>
      </Layout>
    </>
  )
}

const StyledConnectingCircle = styled(ConnectingCircle)`
  transform: translateX(-6px);
  width: 65%;
  margin-bottom: 16px;
`

const Layout = styled.div`
  ${flexCenter}
  flex-direction: column;
`
