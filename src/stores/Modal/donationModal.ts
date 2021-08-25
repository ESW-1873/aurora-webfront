import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const isOpenedDonationModalAtom = atom<boolean>({
  key: 'isOpenedDonationModal',
  default: false,
})
export const isDisableDonationModalEscapeAtom = atom<boolean>({
  key: 'isDisableDonationModalEscape',
  default: false,
})

export const useDonationModalStore = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenedDonationModalAtom)
  const [isEscapeDisabled, setIsEscapeDisabled] = useRecoilState(
    isDisableDonationModalEscapeAtom,
  )
  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])
  const disableEscape = useCallback(
    () => setIsEscapeDisabled(true),
    [setIsEscapeDisabled],
  )
  const enableEscape = useCallback(
    () => setIsEscapeDisabled(false),
    [setIsEscapeDisabled],
  )

  return {
    isOpen,
    isEscapeDisabled,
    open,
    close,
    disableEscape,
    enableEscape,
  }
}
