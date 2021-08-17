import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const isOpenedDonateModalAtom = atom<boolean>({
  key: 'isOpenedDonateModal',
  default: false,
})

export const useDonateModalStore = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenedDonateModalAtom)
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])

  return {
    isOpen,
    open,
    close,
  }
}
