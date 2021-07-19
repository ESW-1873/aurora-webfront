import { NextPage } from 'next'
import { useState } from 'react'
import { useMetamask } from 'src/external/wallet/metamask'
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

const SandBox: NextPage = () => {
  const { address, handleChange } = useAddress()
  const {
    connectMetamask,
    provider,
    balance,
    transactionCount,
    getBalance,
    getTransactionCount,
  } = useMetamask()

  return (
    <FlexBox>
      <h1>Metamask</h1>
      <Spacer height={8} />
      <FlexRow>
        <Button onClick={connectMetamask}>CONNECT</Button>
        <Spacer width={8} />
        <h3>{provider !== null ? 'Connecting' : 'No Connection'}</h3>
      </FlexRow>
      <Spacer height={8} />
      <FlexRow>
        <h3>address</h3>
        <Spacer width={8} />
        <InputText type="text" value={address} onChange={handleChange} />
      </FlexRow>
      <Spacer height={8} />
      <FlexRow>
        <Button onClick={() => getBalance({ address: address })}>
          getBalance
        </Button>
        <Spacer width={8} />
        <h3>{balance !== undefined ? balance.toString() : 'undefined'}</h3>
      </FlexRow>
      <Spacer height={8} />
      <FlexRow>
        <Button onClick={() => getTransactionCount({ address: address })}>
          getTransactionCount
        </Button>
        <Spacer width={8} />
        <h3>
          {transactionCount !== undefined ? transactionCount : 'undefined'}
        </h3>
      </FlexRow>
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
