import router from 'next/router'
import React, { useMemo, VFC } from 'react'
import {
  CancelButton,
  PrimaryButton,
  PrimaryTxButton,
} from 'src/components/Buttons/CtaButton'
import { TwitterShareButton } from 'src/components/Buttons/TwitterShareButton'
import {
  useCancelModalStore,
  useDonationModalStore,
  useWithdrawModalStore,
} from 'src/stores'
import { fontWeightSemiBold } from 'src/styles/font'
import { breakpoint, flexCenter } from 'src/styles/mixins'
import { HOSTNAME } from 'src/utils/env'
import { START } from 'src/utils/router'
import styled from 'styled-components'

type Status =
  | 'DONATABLE'
  | 'CANCELABLE'
  | 'MINE'
  | 'MINE_CLOSED'
  | 'MINE_CLOSED_NO_DONATIONS'
  | 'CLOSED'

type ComputeStatusParam = Partial<{
  isDonee: boolean
  hasClosed: boolean
  hasDonated: boolean
  hasWithdrawn: boolean
  hasNoDonations: boolean
}>
const computeStatus = ({
  isDonee,
  hasClosed,
  hasDonated,
  hasNoDonations,
}: ComputeStatusParam): Status => {
  if (isDonee) {
    if (!hasClosed) return 'MINE'
    return hasNoDonations ? 'MINE_CLOSED_NO_DONATIONS' : 'MINE_CLOSED'
  }
  if (hasDonated) return hasClosed ? 'CLOSED' : 'CANCELABLE'
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
          {params.hasWithdrawn && <Label>Withdrawn</Label>}
          {!params.hasWithdrawn && (
            <PrimaryTxButton onClick={openWithdrawModal} label="Withdraw" />
          )}
        </SingleButtonLayout>
      )}
      {status === 'MINE_CLOSED_NO_DONATIONS' && (
        <SingleButtonLayout>
          <Label>oops! donation not found.</Label>
          <PrimaryTxButton
            onClick={() => router.push(START)}
            label="Never give up!"
          />
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
