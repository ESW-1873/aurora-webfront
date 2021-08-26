import { UnsupportedChainIdError } from '@web3-react/core'
import { VFC } from 'react'
import styled from 'styled-components'
import { Heading, SubHeading } from '../common'

export const WalletError: VFC<{ error: Error }> = ({ error }) => {
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError
  return (
    <>
      <Layout>
        <Heading>
          {isUnsupportedChainIdError ? 'Wrong Network' : 'Error'}
        </Heading>
        <SubHeading>
          {isUnsupportedChainIdError
            ? 'Please switch to Matic'
            : 'Please try refreshing the page and connecting again'}
        </SubHeading>
      </Layout>
    </>
  )
}

const Layout = styled.div`
  padding: 0 24px;
  ${Heading} {
    margin-bottom: 16px;
  }
`
