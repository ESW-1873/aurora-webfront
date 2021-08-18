import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const isOpenedCancelModalAtom = atom<boolean>({
  key: 'isOpenedCancelModal',
  default: false,
})

export const useCancelModalStore = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenedCancelModalAtom)
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])

  return {
    isOpen,
    open,
    close,
  }
}
