import React, { VFC } from 'react'
import { RecoilRoot } from 'recoil'
import { isOpenedSpecificationModalAtom } from 'src/stores/Modal/specificationModal'
import { SpecificationModal } from '.'

export default {
  title: 'SpecificationModal',
}

export const SpecificationModalPage: VFC = () => (
  <RecoilRoot
    initializeState={(snap) => snap.set(isOpenedSpecificationModalAtom, true)}
  >
    <SpecificationModal publish={() => {}} />
  </RecoilRoot>
)
