import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const withdrawModalAtom = atom<boolean>({
  key: 'isOpenedWithdrawModal',
  default: false,
})

export const useWithdrawModalStore = () => {
  const [isOpen, setPostId] = useRecoilState(withdrawModalAtom)
  const open = useCallback(() => setPostId(true), [setPostId])
  const close = useCallback(() => setPostId(false), [setPostId])

  return {
    isOpen,
    open,
    close,
  }
}
