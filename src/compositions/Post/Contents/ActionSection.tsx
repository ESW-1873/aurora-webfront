import { useWeb3React } from '@web3-react/core'
import React, { useState, VFC } from 'react'
import {
  CancelButton,
  PrimaryButton,
  RefundButton,
} from 'src/components/Buttons/CtaButton'
import { TwitterShareButton } from 'src/components/Buttons/TwitterShareButton'
import {
  useCancelModalStore,
  useDonationModalStore,
  useRefundRequestModalStore,
  useWalletModalStore,
} from 'src/stores'
import { errorColor } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

/**
 * this depends on project status from the user's perspective (e.g. open/donated/closed)
 */
// TODO: 現状は仮実装
export const ActionSection: VFC<{
  postTitle: string
  postId: string
  hasClosed: boolean
}> = ({ postTitle, postId, hasClosed }) => {
  const { active } = useWeb3React()
  const { open: openWalletModal } = useWalletModalStore()
  const { open: openDonationModal } = useDonationModalStore()
  const { open: openCancelModal } = useCancelModalStore()
  const { open: openRefundRequestModal } = useRefundRequestModalStore()

  // TODO: UIチェックのために仮で入れてる。ステータスの定義や管理を検討（Recoilかな）
  const [status, setStatus] = useState<
    'DONATABLE' | 'CANCELABLE' | 'REFUNDABLE' | 'MINE' | 'CLOSED'
  >('DONATABLE')

  return (
    <>
      {status === 'DONATABLE' && (
        <DubbleButtonLayout>
          <PrimaryButton
            onClick={active ? openDonationModal : openWalletModal}
            label={active ? 'Donate' : 'Connect Wallet'}
          />
          <TwitterShareButton message={postTitle} path={postId} />
        </DubbleButtonLayout>
      )}
      {status === 'CANCELABLE' && (
        <SingleButtonLayout>
          <Label>You’ve already donated.</Label>
          <CancelButton onClick={openCancelModal} />
        </SingleButtonLayout>
      )}
      {status === 'REFUNDABLE' && (
        <SingleButtonLayout>
          <Label color={errorColor}>Do you have a problem?</Label>
          <RefundButton onClick={openRefundRequestModal} />
        </SingleButtonLayout>
      )}
      {status === 'MINE' && (
        <DubbleButtonLayout>
          <PrimaryButton onClick={() => alert('TODO')} label="Share URL" />
          <TwitterShareButton message={postTitle} path={postId} />
        </DubbleButtonLayout>
      )}
      {status === 'CLOSED' && <Label>This Project has already closed.</Label>}
    </>
  )
}

const Label = styled.p`
  font-size: 20px;
  font-weight: ${fontWeightSemiBold};
  text-align: center;
  color: ${({ color }) => color};
`

const SingleButtonLayout = styled.div`
  ${flexCenter}
  flex-direction: column;
  > ${Label} {
    margin-bottom: 34px;
  }
  > button {
    width: 100%;
  }
`

const DubbleButtonLayout = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  > button {
    width: 46.5%;
  }
  @media ${breakpoint.s} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > button {
      width: 100%;
    }
    > button:last-child {
      margin-top: 16px;
    }
  }
`
