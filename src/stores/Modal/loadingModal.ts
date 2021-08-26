import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

type LoadingModalProps = {
  heading: string
  subHeading: string
}
export const isOpenedLoadingModalAtom = atom<LoadingModalProps | undefined>({
  key: 'isOpenedLoadingModal',
  default: undefined,
})

export const useLoadingModalStore = () => {
  const [props, setProps] = useRecoilState(isOpenedLoadingModalAtom)
  const open = useCallback(
    (props: LoadingModalProps) => setProps(props),
    [setProps],
  )
  const close = useCallback(() => setProps(undefined), [setProps])

  return {
    props,
    open,
    close,
  }
}
