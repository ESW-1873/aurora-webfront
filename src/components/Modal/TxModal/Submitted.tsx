import React, { VFC } from 'react'
import { IconArrowUp } from 'src/assets/svgs'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { Heading } from '../common'

export const Submitted: VFC<{ close: () => void }> = ({ close }) => {
  return (
    <>
      <Layout>
        <Heading>Transaction submitted</Heading>
        <StyledIconArrowUp />
        <PrimaryButton label="Close" onClick={close} />
      </Layout>
    </>
  )
}

const StyledIconArrowUp = styled(IconArrowUp)`
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
`

const Layout = styled.div`
  ${flexCenter}
  flex-direction: column;
  ${Heading} {
    margin-bottom: 16px;
  }
`
