import { utils } from 'ethers'
import React, { useCallback, useEffect, useState, VFC } from 'react'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { useContract } from 'src/external/contract/hooks'
import { useWalletStore } from 'src/stores'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'
import { DonateModalProps } from '.'
import { DisclaimerCheckbox } from '../../Input/Checkbox'
import { DonationInputPanel } from '../../Input/DonationInputPanel'
import { Heading, SubHeading } from '../common'

export type DonationProps = {
  setLoading: (arg0: boolean) => void
  setsubmitted: (arg0: boolean) => void
  setError: (err: any) => void
} & DonateModalProps

export const Donation: VFC<DonationProps> = ({
  postId,
  totalDonation,
  setLoading,
  setsubmitted,
  setError,
}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [canDonate, setCanDonate] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [balance, setBalance] = useState('')
  const [isInsufficient, setIsInsufficient] = useState(false)

  const { donate } = useContract()
  const { currentSigner } = useWalletStore()

  useEffect(() => {
    const fetch = async () => {
      const balance = await currentSigner?.getBalance()
      if (balance) {
        const parsedBalance = utils.formatEther(balance)
        setBalance(parsedBalance)
      }
    }
    fetch()
  }, [currentSigner])

  const onUserInput = useCallback(
    (value: string) => {
      setInputValue(value)
      setIsInsufficient(value > balance)
    },
    [setInputValue, balance],
  )

  useEffect(() => {
    if (isChecked && inputValue !== '' && !isInsufficient) {
      setCanDonate(true)
    } else {
      setCanDonate(false)
    }
  }, [isChecked, inputValue, isInsufficient])

  return (
    <>
      <Layout>
        <Heading>Donation</Heading>
        <SubHeading>
          {`Total Donation ${weiToEth(totalDonation)} ETH`}
        </SubHeading>
        <DonationInputPanel value={inputValue} onUserInput={onUserInput} />
        <DisclaimerCheckbox id="disclaimer-check" setIsChecked={setIsChecked} />
        <PrimaryButton
          label={isInsufficient ? 'Insuffcient ETH' : 'Donate'}
          disabled={!canDonate}
          onClick={async () => {
            setLoading(true)
            try {
              // memo: txの承認状況を別な場所（ヘッダーとか？）に表示する？
              const tx = await donate(postId, inputValue)
              console.log(tx)
              setLoading(false)
            } catch (error: any) {
              setLoading(false)
              setError(error)
              console.error(error)
              return
            }
            setsubmitted(true)
          }}
        />
      </Layout>
    </>
  )
}

const Layout = styled.div`
  ${Heading} {
    margin-bottom: 16px;
  }
  ${SubHeading}, > div, button:not(:last-child) {
    margin-bottom: 24px;
  }
`
