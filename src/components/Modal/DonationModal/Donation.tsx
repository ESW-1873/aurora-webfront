import { utils } from 'ethers'
import React, { useCallback, useEffect, useState, VFC } from 'react'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { useContract } from 'src/external/contract/hooks'
import { useWalletStore } from 'src/stores'
import { weiToEth } from 'src/utils/amount'
import styled from 'styled-components'
import { DonationModalProps } from '.'
import { DisclaimerCheckbox } from '../../Input/Checkbox'
import { DonationInputPanel } from '../../Input/DonationInputPanel'
import { Heading, SubHeading } from '../common'
import { useWithTxModalContext } from '../WithTxModal'

export const Donation: VFC<DonationModalProps> = ({
  postId,
  totalDonation,
}) => {
  const { setLoading, onSuccess, onFail } = useWithTxModalContext()

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
              const tx = await donate(postId, inputValue) // TODO: add metadataURI
              console.log(tx)
            } catch (error: any) {
              onFail(error)
              console.error(error)
              return
            }
            onSuccess()
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
