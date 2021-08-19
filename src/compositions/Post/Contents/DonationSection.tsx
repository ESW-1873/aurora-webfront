import React, { ReactNode, VFC } from 'react'
import { AddressLabel, TxHashLabel } from 'src/components/ExplorerLabel'
import { HorizontalDashedLine } from 'src/components/HorizontalDashedLine'
import { errorColor, turquoise } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import styled from 'styled-components'

type DonationSectionProps = {
  donee: string
  credit?: string
  canceledDonations: { id: string }[]
  hasClosed?: boolean
}
export const DonationSection: VFC<DonationSectionProps> = ({
  donee,
  credit,
  canceledDonations,
  hasClosed,
}) => (
  <>
    <Section>
      <Wrapper title="Donee Address">
        <AddressLabel address={donee} />
      </Wrapper>
      <Wrapper title="Credit Score">
        <CreditLabel>{`${credit} CREDIT`}</CreditLabel>
      </Wrapper>
      <HorizontalDashedLine />
      <Wrapper
        hasClosed={hasClosed}
        title={hasClosed ? 'Refund Request' : 'Canceled Donations'}
      >
        <CanceledDonations donations={canceledDonations} />
      </Wrapper>
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

const CanceledDonations: VFC<{
  donations: { id: string }[]
}> = ({ donations = [] }) => (
  <>
    <AccountListDiv>
      {donations.map(({ id }) => {
        return <TxHashLabel key={id} txHash={id} />
      })}
    </AccountListDiv>
  </>
)

const AccountListDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  > a:not(:last-child) {
    margin-bottom: 16px;
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
