import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const isOpenedDonationModalAtom = atom<boolean>({
  key: 'isOpenedDonationModal',
  default: false,
})

export const useDonationModalStore = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenedDonationModalAtom)
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])

  return {
    isOpen,
    open,
    close,
  }
}
