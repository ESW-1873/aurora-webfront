import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedLoadingModalAtom } from 'src/stores/Modal/loadingModal'
import { LoadingModal } from '.'

export default {
  title: 'LoadingModal',
}

export const LoadingModalPage: VFC = () => (
  <RecoilRoot
    initializeState={(snap) =>
      snap.set(isOpenedLoadingModalAtom, {
        heading: 'Loading Heading',
        subHeading: 'Loading Sub Heading',
      })
    }
  >
    <LoadingModal />
  </RecoilRoot>
)
