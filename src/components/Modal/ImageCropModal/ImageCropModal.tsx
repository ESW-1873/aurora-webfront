import React, { VFC } from 'react'
import { useImageCropModalStore } from 'src/stores'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'
import { Modal } from '..'
import { ImageEditComponent } from './EditComponent'

const empty = () => {}
export const ImageCropModal: VFC = () => {
  const { props, close } = useImageCropModalStore()
  return (
    <Modal isOpen={!!props}>
      <Layout>
        <ImageEditComponent
          setImg={props?.save || empty}
          editingImg={props?.src || ''}
          closeModal={close}
        />
      </Layout>
    </Modal>
  )
}

const Layout = styled.div`
  ${flexCenter}
  flex-direction: column;
`
