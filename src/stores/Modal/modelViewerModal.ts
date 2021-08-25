import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { ModelViewerProps } from 'src/components/ModelViewer'

export const modelViewerModalAtom = atom<ModelViewerProps | undefined>({
  key: 'modelViewerModal',
  default: undefined,
})

export const useModelViewerModalStore = () => {
  const [props, setProps] = useRecoilState(modelViewerModalAtom)
  const open = useCallback(
    (newProps: ModelViewerProps) => setProps(newProps),
    [setProps],
  )
  const close = useCallback(() => setProps(undefined), [setProps])

  return {
    props,
    open,
    close,
  }
}
