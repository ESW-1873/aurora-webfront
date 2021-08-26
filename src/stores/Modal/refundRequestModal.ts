import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const isOpenedRefundRequestModalAtom = atom<boolean>({
  key: 'isOpenedRefundRequestModal',
  default: false,
})

export const useRefundRequestModalStore = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenedRefundRequestModalAtom)
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])

  return {
    isOpen,
    open,
    close,
  }
}
