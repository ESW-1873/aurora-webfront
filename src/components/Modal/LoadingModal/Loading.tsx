import React, { VFC } from 'react'
import { LoadingCircle } from 'src/assets/svgs'
import { useLoadingModalStore } from 'src/stores'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { Modal } from '..'
import { Heading, SubHeading } from '../common'

export const LoadingModal: VFC = () => {
  const { props } = useLoadingModalStore()
  const { heading, subHeading } = props || {}
  return (
    <Modal isOpen={!!props}>
      <Layout>
        <Heading>{heading}</Heading>
        <StyledLoadingCircle />
        <SubHeading>{subHeading}</SubHeading>
      </Layout>
    </Modal>
  )
}

const StyledLoadingCircle = styled(LoadingCircle)`
  transform: translateX(-6px);
  width: 65%;
  margin-bottom: 16px;
`

const Layout = styled.div`
  ${flexCenter}
  flex-direction: column;
`
