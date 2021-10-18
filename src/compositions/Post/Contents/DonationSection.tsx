import React, { ReactNode, VFC } from 'react'
import { AddressLabel } from 'src/components/ExplorerLabel'
import { errorColor, turquoise } from 'src/styles/colors'
import { fontWeightBold, fontWeightMedium } from 'src/styles/font'
import styled from 'styled-components'

type DonationSectionProps = {
  donee: string
  capacity: number
  donatedCount: number
  credit?: string
  hasClosed?: boolean
  isDonee?: boolean
}
export const DonationSection: VFC<DonationSectionProps> = ({
  donee,
  capacity,
  donatedCount,
  credit,
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
