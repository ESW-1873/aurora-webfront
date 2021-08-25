import AsyncRetry from 'async-retry'
import { utils } from 'ethers'
import React, { useCallback, useEffect, useState, VFC } from 'react'
import { postClient } from 'src/api/postClient'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { useContract } from 'src/external/contract/hooks'
import { useModelViewerModalStore, useWalletStore } from 'src/stores'
import { equals } from 'src/utils/address'
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
  refetch,
}) => {
  const { account } = useWalletStore()
  const { setLoading, close, onFail } = useWithTxModalContext()
  const { open: openModelViewerModal } = useModelViewerModalStore()

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
          label={isInsufficient ? 'Insufficient ETH' : 'Donate'}
          disabled={!canDonate}
          onClick={async () => {
            setLoading(true)
            try {
              if (!account) {
                throw new Error('You must connect wallet.')
              }
              const res = await postClient.postReceipt({
                postId,
                address: account,
                amount: inputValueEth,
              })
              const modelUrl = res.data.imageUrl
              await donate(postId, inputValueEth, res.data.metadata)
              await Promise.all([
                fetch(modelUrl),
                AsyncRetry(async () => {
                  const res = await refetch()
                  if (
                    !res?.donations?.some((each) =>
                      equals(each.sender, account),
                    )
                  )
                    throw new Error()
                }),
              ])
              openModelViewerModal(modelUrl)
              close()
              setLoading(false)
            } catch (error: any) {
              onFail(error)
              console.error(error)
              return
            }
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
