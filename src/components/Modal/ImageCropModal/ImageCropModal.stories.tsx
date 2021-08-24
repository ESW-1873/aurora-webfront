import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { FOOTER_SRC } from 'src/assets/images'
import { imageCropModalAtom } from 'src/stores/Modal/imageCropModal'
import { ImageCropModal } from '.'

export default {
  title: 'ImageCropModal',
}

export const ImageCropModalPage: VFC = () => (
  <RecoilRoot
    initializeState={(snap) =>
      snap.set(imageCropModalAtom, { src: FOOTER_SRC, save: () => {} })
    }
  >
    <ImageCropModal />
  </RecoilRoot>
)
