import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

/**
 * store for api response of /preview
 */
export type PreviewResponseType = {
  temporalyUrl: string
  token: string
}
const previewResponseAtom = atom<PreviewResponseType | null>({
  key: 'previewResponse',
  default: null,
})
export const usePreviewResponseStore = () => {
  const [state, setState] = useRecoilState(previewResponseAtom)
  const set = useCallback(
    (data: PreviewResponseType) => setState(data),
    [setState],
  )
  const reset = useCallback(() => setState(null), [setState])

  return {
    state,
    set,
    reset,
  }
}
