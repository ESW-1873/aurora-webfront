import { BigNumber } from 'ethers'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useMetamask, useWallet, useWalletConnect } from 'src/external/wallet'
import { useWalletStore } from 'src/stores'
import { lightblue, white } from 'src/styles/colors'
import styled from 'styled-components'

const useAddress = () => {
  const [address, setAddress] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value)

  return {
    address,
    handleChange,
  }
}

type SignerInfo = {
  address: string
  balance: BigNumber
  chainId: number
  transactionCount: number
}

const SandBox: NextPage = () => {
  const { address, handleChange } = useAddress()
  const { currentSigner } = useWalletStore()
  const { disconnect } = useWallet()
  const connectMetamask = useMetamask()
  const connectWalletConnect = useWalletConnect()

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
      <Spacer height={8} />
      <FlexRow>
        <h3>address</h3>
        <Spacer width={8} />
        <InputText type="text" value={address} onChange={handleChange} />
      </FlexRow>
      <h1>useWallet</h1>
      <Button onClick={() => connectMetamask({ address: address })}>
        connectMetamask
      </Button>
      <Button onClick={connectWalletConnect}>connectWalletConnect</Button>
      <Button onClick={() => disconnect()}>disconnect</Button>
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
