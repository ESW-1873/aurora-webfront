import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const isOpenedSpecificationModalAtom = atom<boolean>({
  key: 'isOpenedSpecificationModal',
  default: false,
})

export const useSpecificationModalStore = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenedSpecificationModalAtom)
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])

  return {
    isOpen,
    open,
    close,
  }
}
