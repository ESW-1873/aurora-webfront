import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { Donation } from 'src/api/types'

export const refundModalAtom = atom<Donation | undefined>({
  key: 'isOpenedRefundModal',
  default: undefined,
})

export const useRefundModalStore = () => {
  const [refundRequest, setRefundRequest] = useRecoilState(refundModalAtom)
  const open = useCallback(setRefundRequest, [setRefundRequest])
  const close = useCallback(
    () => setRefundRequest(undefined),
    [setRefundRequest],
  )

  return {
    refundRequest,
    open,
    close,
  }
}
