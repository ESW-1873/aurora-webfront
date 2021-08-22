import React, { useMemo, VFC } from 'react'
import {
  CancelButton,
  PrimaryButton,
  RefundRequestButton,
} from 'src/components/Buttons/CtaButton'
import { TwitterShareButton } from 'src/components/Buttons/TwitterShareButton'
import {
  useCancelModalStore,
  useDonationModalStore,
  useRefundRequestModalStore,
  useWalletModalStore,
  useWalletStore,
} from 'src/stores'
import { errorColor } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

type Status =
  | 'DONATABLE'
  | 'CANCELABLE'
  | 'REFUND_REQUESTABLE'
  | 'MINE'
  | 'REFUND_REQUESTED'
  | 'CLOSED'

type ComputeStatusParam = Partial<{
  isDonee: boolean
  hasClosed: boolean
  hasDonated: boolean
  hasRefundRequests: boolean
}>
const computeStatus = ({
  isDonee,
  hasClosed,
  hasDonated,
  hasRefundRequests,
}: ComputeStatusParam): Status => {
  if (isDonee) return hasRefundRequests ? 'REFUND_REQUESTED' : 'MINE'
  if (hasDonated) return hasClosed ? 'REFUND_REQUESTABLE' : 'CANCELABLE'
  return hasClosed ? 'CLOSED' : 'DONATABLE'
}

export const ActionSection: VFC<
  {
    postTitle: string
    postId: string
  } & ComputeStatusParam
> = ({ postTitle, postId, ...params }) => {
  const { active } = useWalletStore()
  const { open: openWalletModal } = useWalletModalStore()
  const { open: openDonationModal } = useDonationModalStore()
  const { open: openCancelModal } = useCancelModalStore()
  const { open: openRefundRequestModal } = useRefundRequestModalStore()

  const status = useMemo(() => computeStatus(params), [params])

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
          <Label>{`You've already donated.`}</Label>
          <CancelButton onClick={openCancelModal} />
        </SingleButtonLayout>
      )}
      {status === 'REFUND_REQUESTABLE' && (
        <SingleButtonLayout>
          <Label color={errorColor}>Do you have a problem?</Label>
          <RefundRequestButton onClick={openRefundRequestModal} />
        </SingleButtonLayout>
      )}
      {status === 'CLOSED' && (
        <Label>This project has already been closed.</Label>
      )}
      {status === 'MINE' && (
        <DubbleButtonLayout>
          <PrimaryButton onClick={() => alert('TODO')} label="Share URL" />
          <TwitterShareButton message={postTitle} path={postId} />
        </DubbleButtonLayout>
      )}
      {status === 'REFUND_REQUESTED' && (
        <Label color={errorColor}>{`You've got refund requests.`}</Label>
      )}
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
