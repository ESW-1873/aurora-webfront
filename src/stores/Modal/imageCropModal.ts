import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

type ImageCropModalProps = {
  src: string
  save: (url: string) => void
}
export const imageCropModalAtom = atom<ImageCropModalProps | undefined>({
  key: 'imageCropModal',
  default: undefined,
})

export const useImageCropModalStore = () => {
  const [props, setProps] = useRecoilState(imageCropModalAtom)
  const close = useCallback(() => setProps(undefined), [setProps])

  return {
    props,
    open: setProps,
    close,
  }
}
