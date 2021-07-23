import { BigNumber } from 'ethers'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useContract } from 'src/external/contract'
import { useMetamask, useWallet, useWalletConnect } from 'src/external/wallet'
import { useWalletStore } from 'src/stores'
import { lightblue, white } from 'src/styles/colors'
import styled from 'styled-components'

/* custom hook - address入力 */
const useAddress = () => {
  const [walletAdr, setWalletAddress] = useState('')
  const [fromAdr, setFromAddress] = useState('')
  const [toAdr, setToAddress] = useState('')

  const handleChangeWalletAdr = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWalletAddress(e.target.value)
  const handleChangeFromAdr = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFromAddress(e.target.value)
  const handleChangeToAdr = (e: React.ChangeEvent<HTMLInputElement>) =>
    setToAddress(e.target.value)

  return {
    walletAdr,
    fromAdr,
    toAdr,
    handleChangeWalletAdr,
    handleChangeFromAdr,
    handleChangeToAdr,
  }
}

/*
 * for DEBUG
 * Singerから取得できる情報
 */
type SignerInfo = {
  address: string
  balance: BigNumber
  chainId: number
  transactionCount: number
}

/*
 * sandbox用page
 * contract/wallet接続の検証
 */
const SandBox: NextPage = () => {
  const {
    walletAdr,
    fromAdr,
    toAdr,
    handleChangeWalletAdr,
    handleChangeFromAdr,
    handleChangeToAdr,
  } = useAddress()

  /* Wallet connection */
  const { disconnect } = useWallet()
  const connectMetamask = useMetamask()
  const connectWalletConnect = useWalletConnect()
  /* Contract connection */
  const { issue, stake, unstake, restake } = useContract()

  // for DEBUG
  // Signer(署名者)の状態を表示するため
  const { currentSigner } = useWalletStore()
  const [signerInfo, setSignerInfo] = useState<SignerInfo | null>(null)
  useEffect(() => {
    async function fetchSignerInfo() {
      if (currentSigner !== null) {
        setSignerInfo({
          address: await currentSigner.getAddress(),
          balance: await currentSigner.getBalance(),
          chainId: await currentSigner.getChainId(),
          transactionCount: await currentSigner.getTransactionCount(),
        })
      } else {
        setSignerInfo(null)
      }
    }

    fetchSignerInfo()
  }, [currentSigner])

  return (
    <FlexBox>
      <h1>Wallet</h1>
      <FlexRow>
        <h3>Wallet Address</h3>
        <Spacer width={8} />
        <InputText
          type="text"
          value={walletAdr}
          onChange={handleChangeWalletAdr}
        />
      </FlexRow>
      <Spacer height={8} />
      <h2>useWallet</h2>
      <Button onClick={() => connectMetamask({ address: walletAdr })}>
        connectMetamask
      </Button>
      <Button onClick={connectWalletConnect}>connectWalletConnect</Button>
      <Button onClick={() => disconnect()}>disconnect</Button>
      <h3>signerInfo</h3>
      {signerInfo === null ? (
        <h3>null</h3>
      ) : (
        <>
          <h3>{`getAddress ... ${signerInfo.address}`}</h3>
          <h3>{`getBalance ... ${signerInfo.balance}`}</h3>
          <h3>{`getChainId ... ${signerInfo.chainId}`}</h3>
          <h3>{`getTransactionCount ... ${signerInfo.transactionCount}`}</h3>
        </>
      )}
      <Spacer height={8} />
      <h3>-------------------------------------</h3>
      <Spacer height={8} />
      <h1>Contract</h1>
      <Spacer height={8} />
      <h2>useContract</h2>
      <Button onClick={issue}>issue</Button>
      <Spacer height={8} />
      <FlexRow>
        <h3>To Address</h3>
        <Spacer width={8} />
        <InputText type="text" value={toAdr} onChange={handleChangeToAdr} />
      </FlexRow>
      <Spacer height={8} />
      <Button onClick={() => stake(toAdr)}>stake</Button>
      <Button onClick={() => unstake(toAdr)}>unstake</Button>
      <Spacer width={8} />
      <FlexRow>
        <h3>From Address</h3>
        <Spacer width={8} />
        <InputText type="text" value={fromAdr} onChange={handleChangeFromAdr} />
      </FlexRow>
      <Spacer width={8} />
      <Button onClick={() => restake(fromAdr, toAdr)}>restake</Button>
    </FlexBox>
  )
}

export default SandBox

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const FlexRow = styled(FlexBox)`
  flex-direction: row;
`

const Spacer = styled.div<{ height?: number; width?: number }>`
  height: ${(props) => (props.height !== null ? `${props.height}px` : '0px')};
  width: ${(props) => (props.width !== null ? `${props.width}px` : '0px')};
`

const InputText = styled.input`
  width: 400px;
  height: 25px;
  border: 1px solid ${white};
`

const Button = styled.button`
  width: 200px;
  height: 50px;
  background: ${lightblue};
  text-align: center;
`
