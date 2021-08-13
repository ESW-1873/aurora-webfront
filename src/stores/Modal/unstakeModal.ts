import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const isOpenedUnstakeModalAtom = atom<boolean>({
  key: 'isOpenedUnstakeModal',
  default: false,
})

export const useUnstakeModalStore = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenedUnstakeModalAtom)
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])

  return {
    isOpen,
    open,
    close,
  }
}
