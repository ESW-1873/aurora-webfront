import AsyncRetry from 'async-retry'
import { utils } from 'ethers'
import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react'
import { postClient } from 'src/api/postClient'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { STORAGE_HOST } from 'src/constants/misc'
import { useContract } from 'src/external/contract/hooks'
import {
  useDonationModalStore,
  useModelViewerModalStore,
  useWalletStore,
} from 'src/stores'
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
  const { disableEscape, enableEscape } = useDonationModalStore()
  const { account } = useWalletStore()
  const { setLoading, close, onFail } = useWithTxModalContext()
  const { open: openModelViewerModal } = useModelViewerModalStore()

  const [isChecked, setIsChecked] = useState(false)
  const [inputValueEth, setInputValueEth] = useState('')
  const [balance, setBalance] = useState('')
  const [isInsufficient, setIsInsufficient] = useState(false)

  const canDonate = useMemo(() => {
    try {
      return (
        isChecked && utils.parseEther(inputValueEth).gt(0) && !isInsufficient
      )
    } catch {
      return false
    }
  }, [isChecked, inputValueEth, isInsufficient])

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
            disableEscape()
            try {
              if (!account) {
                throw new Error('You must connect wallet.')
              }
              const res = await postClient.postReceipt({
                postId,
                address: account,
                amount: inputValueEth,
              })
              await donate(postId, inputValueEth, res.data.metadata)
              await AsyncRetry(async () => {
                const res = await refetch()
                if (
                  !res?.donations?.some((each) => equals(each.sender, account))
                )
                  throw new Error()
              })
              openModelViewerModal({
                src: `${STORAGE_HOST}/${res.data.image}`,
                alt: 'NFT Card',
                onLoad: () => {
                  close()
                  setLoading(false)
                },
              })
            } catch (error: any) {
              onFail(error)
              console.error(error)
              return
            } finally {
              enableEscape()
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
