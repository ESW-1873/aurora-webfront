import router from 'next/router'
import React, { useMemo, VFC } from 'react'
import {
  CancelButton,
  PrimaryButton,
  PrimaryTxButton,
  RefundRequestButton,
} from 'src/components/Buttons/CtaButton'
import { TwitterShareButton } from 'src/components/Buttons/TwitterShareButton'
import {
  useCancelModalStore,
  useDonationModalStore,
  useRefundRequestModalStore,
  useWithdrawModalStore,
} from 'src/stores'
import { errorColor } from 'src/styles/colors'
import { fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, flexCenter } from 'src/styles/mixins'
import { HOSTNAME } from 'src/utils/env'
import { RAISE } from 'src/utils/router'
import styled from 'styled-components'

type Status =
  | 'DONATABLE'
  | 'CANCELABLE'
  | 'REFUND_REQUESTABLE'
  | 'MINE'
  | 'MINE_CLOSED'
  | 'CLOSED'

type ComputeStatusParam = Partial<{
  isDonee: boolean
  hasClosed: boolean
  hasDonated: boolean
  hasRefundRequests: boolean
  hasWithdrawn: boolean
  hasNoDonations: boolean
}>
const computeStatus = ({
  isDonee,
  hasClosed,
  hasDonated,
}: ComputeStatusParam): Status => {
  if (isDonee) return hasClosed ? 'MINE_CLOSED' : 'MINE'
  if (hasDonated) return hasClosed ? 'REFUND_REQUESTABLE' : 'CANCELABLE'
  return hasClosed ? 'CLOSED' : 'DONATABLE'
}

export const ActionSection: VFC<
  {
    postTitle: string
    postId: string
  } & ComputeStatusParam
> = ({ postTitle, postId, ...params }) => {
  const { open: openDonationModal } = useDonationModalStore()
  const { open: openCancelModal } = useCancelModalStore()
  const { open: openRefundRequestModal } = useRefundRequestModalStore()
  const { open: openWithdrawModal } = useWithdrawModalStore()

  const status = useMemo(() => computeStatus(params), [params])

  return (
    <>
      {status === 'DONATABLE' && (
        <DubbleButtonLayout>
          <PrimaryTxButton onClick={openDonationModal} label="Donate" />
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
          <PrimaryButton
            onClick={() => {
              window.navigator.share({
                title: postTitle,
                url: `https://${HOSTNAME}/${postId}`,
              })
            }}
            label="Share URL"
          />
          <TwitterShareButton message={postTitle} path={postId} />
        </DubbleButtonLayout>
      )}
      {status === 'MINE_CLOSED' && (
        <SingleButtonLayout>
          {params.hasRefundRequests && (
            <Label color={errorColor}>{`You've got refund requests.`}</Label>
          )}
          {params.hasNoDonations ? (
            <>
              <Label>oops! donation not found.</Label>
              <PrimaryTxButton
                onClick={() => router.push(RAISE)}
                label="Never give up!"
              />
            </>
          ) : params.hasWithdrawn ? (
            <Label>Withdrawn.</Label>
          ) : (
            <PrimaryTxButton onClick={openWithdrawModal} label="Withdraw" />
          )}
        </SingleButtonLayout>
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
