import dynamic from 'next/dynamic'
import React, { VFC } from 'react'
import { IconClose } from 'src/assets/svgs'
import { ModelViewerProps } from 'src/components/ModelViewer'
import { useModelViewerModalStore } from 'src/stores'
import { white } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import styled, { keyframes } from 'styled-components'
import { Modal } from '..'

const Model = dynamic<ModelViewerProps>(
  () => import('src/components/ModelViewer'),
  {
    ssr: false,
  },
)

export const ModelViewerModal: VFC = () => {
  const { props = { src: '', alt: '' }, close } = useModelViewerModalStore()
  return (
    <Modal isOpen={!!props.src} transparent>
      <Layout>
        <Model {...props} />
      </Layout>
      <StyledIconClose onClick={close} />
    </Modal>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const StyledIconClose = styled(IconClose)`
  width: 32px;
  height: 32px;
  fill: ${white};
  position: absolute;
  top: 5%;
  right: 10%;
  cursor: pointer;
`

const Layout = styled.div`
  position: fixed;
  inset: 0;
  ${flexCenter}
  flex-direction: column;
  animation: ${fadeIn} 1s linear;
`
