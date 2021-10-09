import React, { useEffect, useRef, VFC } from 'react'
import { useCountUp } from 'react-countup'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { weiToMatic } from 'src/utils/amount'
import styled from 'styled-components'

export const TotalDonationLabel: VFC<{
  amountWei: string
  amountCapacity: number
}> = ({ amountWei, amountCapacity }) => {
  const maticStr = weiToMatic(amountWei)
  const maticNum = Number.isNaN(+maticStr) ? -1 : +maticStr
  return (
    <Label>
      <span>Total Donation:</span>
      <div>
        {maticNum >= 0 && <CountUp num={maticNum} />}
        {maticNum < 0 && maticStr}
        <span>MATIC</span>
        <CapacityDiv>
          <span>/</span>
          <span>{amountCapacity}</span>
        </CapacityDiv>
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

const CapacityDiv = styled.span`
  font-size: 18px;
  font-weight: ${fontWeightRegular};
  span: {
    margin: 0 1px;
  }
`
