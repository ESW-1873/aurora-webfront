import { Provider } from '@ethersproject/providers'
import { BigNumber, Contract, Signer } from 'ethers'
import { useMemo, useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ABIJSON from 'src/abi/PostManager.json'
import { Header } from 'src/components/Header'
import { CONTRACT_ADDRESS } from 'src/constants/address'
import { useWalletStore } from 'src/stores'
import { fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { ABI, Element } from './types'

const abi = ABIJSON as ABI

const getContractAddress = (chainId: number) => {
  return CONTRACT_ADDRESS[chainId]
}

const factory = (
  chainId: number,
  abi: ABI,
  signerOrProvider: Signer | Provider,
) => {
  return new Contract(getContractAddress(chainId), abi, signerOrProvider)
}

export const Client = () => {
  const { account, chainId, currentSigner } = useWalletStore()
  const contract = useMemo(
    () =>
      chainId && currentSigner
        ? factory(chainId, abi, currentSigner)
        : undefined,
    [chainId, currentSigner],
  )
  const views = abi.filter(
    (element) =>
      element.type === 'function' && element.stateMutability === 'view',
  )
  const nonpayable = abi.filter(
    (element) =>
      element.type === 'function' && element.stateMutability === 'nonpayable',
  )
  const payable = abi.filter(
    (element) =>
      element.type === 'function' && element.stateMutability === 'payable',
  )
  return (
    <Layout>
      <Header />
      <h2>VIEW</h2>
      {views.map((each) => (
        <Form
          key={each.name}
          element={each}
          account={account}
          contract={contract}
          view
        />
      ))}
      <h2>NON-PAYABLE</h2>
      {nonpayable.map((each) => (
        <Form
          key={each.name}
          element={each}
          account={account}
          contract={contract}
        />
      ))}
      <h2>PAYABLE</h2>
      {payable.map((each) => (
        <Form
          key={each.name}
          element={each}
          account={account}
          contract={contract}
          payable
        />
      ))}
    </Layout>
  )
}
const DEFAULT_GAS_LIMIT = 4500000
const Form: VFC<{
  element: Element
  account?: string | null
  contract?: Contract
  payable?: boolean
  view?: boolean
}> = ({ element, account, contract, payable, view }) => {
  const methods = useForm()
  const { handleSubmit, register } = methods
  const [output, setOutput] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <FormProvider key={element.name} {...methods}>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            if (!contract) return
            const func = contract[element.name]
            if (!func) return
            const args = element.inputs.map(({ type }, idx) => {
              const input = data.args[idx]
              if (type === 'uint256') {
                return BigNumber.from(input)
              }
              return input
            })
            const options = {
              value: payable ? BigNumber.from(data.value) : undefined,
              gasLimit: view ? undefined : DEFAULT_GAS_LIMIT,
            }
            console.log(...args, options)
            const res = args
              ? await func(...args, options)
              : await func(options)
            setOutput(res)
          } catch (e) {
            setErrorMessage(JSON.stringify(e))
          }
        })}
      >
        <Section>
          <div>
            <h3>{element.name}</h3>
            <button disabled={!account}>Call</button>
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Inputs>
            {payable && (
              <label>
                <p>
                  value: <span>uint256</span>
                </p>
                <input {...register(`value`, { required: true })} />
              </label>
            )}
            {element.inputs.map((each, idx, arr) => {
              const name =
                each.name || (arr.length > 1 ? `key${idx + 1}` : 'key')
              return (
                <label key={name}>
                  <p>
                    {name}: <span>{each.type}</span>
                  </p>
                  <input {...register(`args[${idx}]`, { required: true })} />
                </label>
              )
            })}
          </Inputs>
          {output != null && <Output>{JSON.stringify(output)}</Output>}
        </Section>
      </form>
    </FormProvider>
  )
}

const Layout = styled.div`
  width: 100%;
  padding: 40px;
  max-width: 720px;
  margin: 0 auto;
  font-size: 16px;
  h2 {
    margin-top: 40px;
    font-size: 32px;
  }
`
const Section = styled.section`
  margin-top: 20px;
  font-size: 24px;
  > div {
    display: flex;
    justify-content: space-between;
  }
  h3 {
    font-size: 24px;
    font-weight: ${fontWeightSemiBold};
  }
  button {
    display: block;
    :disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`
const Inputs = styled.div`
  margin-top: 12px;
  display: flex;
  padding: 0 56px;
  flex-direction: column;
  label {
    width: 100%;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    span {
      font-style: italic;
    }
    input {
      border: 1px solid;
    }
  }
`

const Output = styled.div`
  margin-top: 12px;
  width: 100%;
  border: 1px dotted;
  padding: 12px;
  font-size: 14px;
  background-color: lightgray;
  word-break: break-all;
`

const ErrorMessage = styled.div`
  margin-top: 12px;
  width: 100%;
  border: 1px dotted;
  padding: 12px;
  font-size: 14px;
  background-color: lightgray;
  color: darkred;
  word-break: break-all;
`
