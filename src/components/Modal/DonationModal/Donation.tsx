import { utils } from 'ethers'
import React, { useCallback, useEffect, useState, VFC } from 'react'
import { postClient } from 'src/api/postClient'
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
  const { account } = useWalletStore()
  const { setLoading, onSuccess, onFail } = useWithTxModalContext()

  const [isChecked, setIsChecked] = useState(false)
  const [canDonate, setCanDonate] = useState(false)
  const [inputValueEth, setInputValueEth] = useState('')
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
      setInputValueEth(value)
      setIsInsufficient(value > balance)
    },
    [setInputValueEth, balance],
  )

  useEffect(() => {
    if (isChecked && inputValueEth !== '' && !isInsufficient) {
      setCanDonate(true)
    } else {
      setCanDonate(false)
    }
  }, [isChecked, inputValueEth, isInsufficient])

  return (
    <>
      <Layout>
        <Heading>Donation</Heading>
        <SubHeading>
          {`Total Donation ${weiToEth(totalDonation)} ETH`}
        </SubHeading>
        <DonationInputPanel value={inputValueEth} onUserInput={onUserInput} />
        <DisclaimerCheckbox
          id="disclaimer-check"
          setIsChecked={setIsChecked}
          isChecked={isChecked}
        />
        <PrimaryButton
          label={isInsufficient ? 'Insuffcient ETH' : 'Donate'}
          disabled={!canDonate}
          onClick={async () => {
            setLoading(true)
            try {
              if (!account) throw new Error('You must connect wallet.')
              const res = await postClient.postReceipt({
                postId,
                address: account,
                amount: inputValueEth,
              })
              // memo: txの承認状況を別な場所（ヘッダーとか？）に表示する？
              const tx = await donate(postId, inputValueEth, res.data.metadata)
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
