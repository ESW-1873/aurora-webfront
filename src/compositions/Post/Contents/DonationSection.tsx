import React, { ReactNode, VFC } from 'react'
import { AddressLabel } from 'src/components/AddressLabel'
import { HorizontalDashedLine } from 'src/components/HorizontalDashedLine'
import { MOCK_POST } from 'src/constants/tmp/post'
import { errorColor, turquoise } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import styled from 'styled-components'

export const DonationSection: VFC<{ isClosed?: boolean }> = ({ isClosed }) => (
  <>
    <Section>
      <Wrapper title="Donee Address">
        <AddressLabel address={MOCK_POST.donee} />
      </Wrapper>
      <Wrapper title="Credit Score">
        <CreditLabel>{`${MOCK_POST.credit} CREDIT`}</CreditLabel>
      </Wrapper>
      <HorizontalDashedLine />
      <Wrapper
        isClosed={isClosed}
        title={isClosed ? 'Refund Request' : 'Canceled Donations'}
      >
        <CanceledDonations donations={MOCK_POST.canceled} />
      </Wrapper>
    </Section>
  </>
)

const Wrapper: VFC<{
  title: string
  children: ReactNode
  isClosed?: boolean
}> = ({ title, children, isClosed }) => (
  <>
    <WrapperLayout isClosed={isClosed}>
      <Title>{title}</Title>
      {children}
    </WrapperLayout>
  </>
)

const CanceledDonations: VFC<{ donations: any[] /*TODO:DONATIONの型*/ }> = ({
  donations = [],
}) => (
  <>
    <AccountListDiv>
      {donations.map((donation, key) => {
        return <AddressLabel key={key} address={donation.sender} />
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

const WrapperLayout = styled.div<{ isClosed?: boolean }>`
  display: flex;
  justify-content: space-between;
  color: ${({ isClosed }) => (isClosed ? errorColor : 'inherit')};
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
