import React, { useEffect, useRef, VFC } from 'react'
import { useCountUp } from 'react-countup'
import { fontWeightSemiBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'

export const TotalDonationLabel: VFC<{ amountWei: string }> = ({
  amountWei,
}) => {
  const ethStr = weiToEth(amountWei)
  const ethNum = Number.isNaN(+ethStr) ? -1 : +ethStr
  return (
    <Label>
      <span>Total Donation:</span>
      <div>
        {ethNum >= 0 && <CountUp num={ethNum} />}
        {ethNum < 0 && ethStr}
        <span>ETH</span>
      </div>
    </Label>
  )
}
const CountUp: VFC<{ num: number }> = ({ num }) => {
  const ref = useRef(null)
  const { start } = useCountUp({
    ref,
    end: num,
    decimals: num > 1 ? 4 : `${num}`.split('.')[1]?.length || 4,
    duration: 0.25,
  })
  useEffect(() => {
    if (num) start()
  }, [num, start])
  return <span ref={ref} />
}

const Label = styled.label`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 40px;
  font-weight: ${fontWeightSemiBold};
  letter-spacing: -0.04em;
  @media ${breakpoint.m} {
    font-size: 20px;
  }
  div {
    span {
      :last-child {
        margin-left: 8px;
      }
    }
  }
`
