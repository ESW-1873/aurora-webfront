import React, { useEffect, useRef, VFC } from 'react'
import { useCountUp } from 'react-countup'
import { fontWeightSemiBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'

export const TotalDonationLabel: VFC<{ amountWei: string }> = ({
  amountWei,
}) => {
  const ref = useRef(null)
  const ethStr = weiToEth(amountWei)
  const ethNum = Number.isNaN(+ethStr) ? 0 : +ethStr
  const { start } = useCountUp({
    ref,
    end: ethNum,
    decimals: ethNum > 1 ? 4 : `${ethNum}`.split('.')[1]?.length || 4,
    duration: 0.25,
  })
  useEffect(() => {
    if (ethNum) start()
  }, [ethNum, start])
  return (
    <Label>
      <span>Total Donation:</span>
      <div>
        <span ref={ref} />
        {!ethNum && ethStr}
        <span>ETH</span>
      </div>
    </Label>
  )
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
