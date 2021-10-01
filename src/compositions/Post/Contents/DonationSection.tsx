import React, { ReactNode, VFC } from 'react'
import { Donation } from 'src/api/types'
import { AddressButton, AddressLabel } from 'src/components/ExplorerLabel'
import { HorizontalDashedLine } from 'src/components/HorizontalDashedLine'
import { useRefundModalStore } from 'src/stores/Modal/refundModal'
import { errorColor, turquoise } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import styled from 'styled-components'

type DonationSectionProps = {
  donee: string
  capacity: number
  donatedCount: number
  credit?: string
  refundRequests: Donation[]
  hasClosed?: boolean
  isDonee?: boolean
}
export const DonationSection: VFC<DonationSectionProps> = ({
  donee,
  capacity,
  donatedCount,
  credit,
  refundRequests,
  hasClosed,
  isDonee,
}) => (
  <>
    <Section>
      <Wrapper title="Fundraiser Address">
        <AddressLabel address={donee} />
      </Wrapper>
      <Wrapper title="Donated">
        <CapLabel>
          <span>{donatedCount}/</span>
          {capacity}
        </CapLabel>
      </Wrapper>
      {credit && (
        <Wrapper title="Credit Score">
          <CreditLabel>{`${credit} CREDIT`}</CreditLabel>
        </Wrapper>
      )}
      {hasClosed && (
        <ReceiptsWrapper
          title="Refund Requests"
          receipts={refundRequests}
          isDonee={isDonee}
          hasClosed
        />
      )}
    </Section>
  </>
)

const Wrapper: VFC<{
  title: string
  children: ReactNode
  hasClosed?: boolean
}> = ({ title, children, hasClosed }) => (
  <>
    <WrapperLayout hasClosed={hasClosed}>
      <Title>{title}</Title>
      {children}
    </WrapperLayout>
  </>
)

const ReceiptsWrapper: VFC<{
  title: string
  receipts: Donation[]
  isDonee?: boolean
  hasClosed?: boolean
}> = ({ title, receipts, hasClosed, isDonee }) => {
  const { open } = useRefundModalStore()
  if (receipts.length <= 0) return <></>
  return (
    <>
      <HorizontalDashedLine />
      <Wrapper title={title} hasClosed={hasClosed}>
        <AccountListDiv>
          {isDonee
            ? receipts.map((receipt) => (
                <AddressButton
                  key={receipt.id}
                  address={receipt.sender}
                  onClick={() => open(receipt)}
                />
              ))
            : receipts.map(({ id, sender }) => {
                return <AddressLabel key={id} address={sender} />
              })}
        </AccountListDiv>
      </Wrapper>
    </>
  )
}

const AccountListDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  > a:not(:last-child) {
    margin-bottom: 16px;
  }
`

const CapLabel = styled.p`
  font-size: 16px;
  letter-spacing: -0.04em;
  line-height: 1;
  text-align: right;
  span {
    font-weight: ${fontWeightMedium};
    font-size: 20px;
  }
`

const CreditLabel = styled.p`
  font-weight: ${fontWeightMedium};
  font-size: 20px;
  letter-spacing: -0.04em;
  line-height: 1;
  text-align: right;
  color: ${turquoise};
`

const Title = styled.p`
  font-size: 20px;
  font-weight: ${fontWeightBold};
  line-height: 1.2;
  letter-spacing: 0;
`

const WrapperLayout = styled.div<{ hasClosed?: boolean }>`
  display: flex;
  justify-content: space-between;
  color: ${({ hasClosed }) => (hasClosed ? errorColor : 'inherit')};
  :not(:last-child) {
    align-items: center;
  }
`

const Section = styled.section`
  padding-top: 64px;
  > div:not(:last-child) {
    margin-bottom: 24px;
  }
`
