import React, { VFC } from 'react'
import { useWithdrawModalStore } from 'src/stores'
import { WithTxModal } from '../WithTxModal'
import { Withdraw, WithdrawProps } from './Withdraw'

export const WithdrawModal: VFC<WithdrawProps> = (props) => {
  const { isOpen, close } = useWithdrawModalStore()
  return (
    <WithTxModal isOpen={isOpen} close={close}>
      {isOpen && <Withdraw {...props} />}
    </WithTxModal>
  )
}
