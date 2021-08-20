import React, { VFC } from 'react'
import { IconAlert } from 'src/assets/svgs'
import { errorColor } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { Heading, SubHeading } from '../common'

export const TxError: VFC<{ error: any }> = ({ error }) => {
  return (
    <>
      <Layout>
        <Heading>Error</Heading>
        <StyledIconAlert />
        <SubHeading>
          {/* TODO: Error handling */}
          {error.code === 4001
            ? 'Transaction rejected.'
            : 'Please refresh this page and try again.\nOr check your wallet and transactions.'}
        </SubHeading>
      </Layout>
    </>
  )
}

const StyledIconAlert = styled(IconAlert)`
  transform: translateX(4px);
  width: 64px;
  height: 64px;
  fill: ${errorColor};
  margin-bottom: 16px;
`

const Layout = styled.div`
  ${flexCenter}
  flex-direction: column;
  ${Heading} {
    margin-bottom: 16px;
  }
  ${SubHeading} {
    white-space: pre-wrap;
    color: ${errorColor};
    font-size: 16px;
  }
`
