import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { MOCK_MODEL_URL } from 'src/data/__mocks__'
import { modelViewerModalAtom } from 'src/stores/Modal/modelViewerModal'
import { ModelViewerModal } from '.'

export default {
  title: 'ModelViewerModal',
}

export const ModelViewerModalPage: VFC = () => (
  <RecoilRoot
    initializeState={(snap) =>
      snap.set(modelViewerModalAtom, { src: MOCK_MODEL_URL, alt: '' })
    }
  >
    <ModelViewerModal />
  </RecoilRoot>
)
