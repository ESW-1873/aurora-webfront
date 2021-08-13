import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const isOpenedWalletModalAtom = atom<boolean>({
  key: 'isOpenedWalletModal',
  default: false,
})

export const useWalletModalStore = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenedWalletModalAtom)
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])

  return {
    isOpen,
    open,
    close,
  }
}
