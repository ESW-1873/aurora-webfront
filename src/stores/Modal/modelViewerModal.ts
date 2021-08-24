import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const modelViewerModalAtom = atom<string | undefined>({
  key: 'modelodelViewerModal',
  default: undefined,
})

export const useModelViewerModalStore = () => {
  const [src, setSrc] = useRecoilState(modelViewerModalAtom)
  const open = useCallback((srcUrl: string) => setSrc(srcUrl), [setSrc])
  const close = useCallback(() => setSrc(undefined), [setSrc])

  return {
    src,
    open,
    close,
  }
}
