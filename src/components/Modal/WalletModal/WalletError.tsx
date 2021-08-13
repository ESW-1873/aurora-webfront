import { UnsupportedChainIdError } from '@web3-react/core'
import { VFC } from 'react'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

export const WalletError: VFC<{ error: Error }> = ({ error }) => {
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError
  return (
    <>
      <Layout>
        <Title>{isUnsupportedChainIdError ? 'Wrong Network' : 'Error'}</Title>
        <Description>
          {isUnsupportedChainIdError
            ? 'Please connect to the Ethereum Mainnet.'
            : 'Please try refreshing the page and connecting again.'}
        </Description>
      </Layout>
    </>
  )
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${breakpoint.s} {
    padding: 0 20px;
  }
`

const Title = styled.h3`
  font-size: 32px;
  font-weight: ${fontWeightBold};
  line-height: calc(41 / 32);
  margin-bottom: 32px;
  text-align: center;
`
const Description = styled.p`
  font-size: 16px;
  font-weight: ${fontWeightMedium};
  line-height: 1.4;
  letter-spacing: 0.024em;
  text-align: center;
`
