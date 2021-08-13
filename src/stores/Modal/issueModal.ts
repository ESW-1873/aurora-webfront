import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export const isOpenedIssueModalAtom = atom<boolean>({
  key: 'isOpenedIssueModal',
  default: false,
})

// TODO: スマコンに接続して状態を管理するのでスマコン側に移動させる？一旦ここに配置。
const isIssuedInitialCreditAtom = atom<boolean>({
  key: 'isIssuedInitialCredit',
  default: false,
})

export const useIssueModalStore = () => {
  // TODO: 仮実装。スマコン側で管理するのが良さそう。Issueを実装する際に対応。
  // accountが切り替わる→signerが変わる→issuedCreditの値が変わる（再度スマコンに聞きに行く）→IssueModalが開くようになるとよさそう
  const [isIssuedInitialCredit, setIsIssuedInitialCredit] = useRecoilState(
    isIssuedInitialCreditAtom,
  )
  const { account } = useWeb3React()
  const [isOpen, setIsOpen] = useRecoilState(isOpenedIssueModalAtom)
  const open = useCallback(() => {
    if (account && !isIssuedInitialCredit) {
      setIsOpen(true)
    }
  }, [account, isIssuedInitialCredit, setIsOpen])
  const close = useCallback(() => {
    setIsIssuedInitialCredit(true)
    setIsOpen(false)
  }, [setIsIssuedInitialCredit, setIsOpen])

  return {
    isOpen,
    open,
    close,
  }
}
