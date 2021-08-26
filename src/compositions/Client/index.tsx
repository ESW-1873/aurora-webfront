import { Provider } from '@ethersproject/providers'
import { BigNumber, Contract, Signer } from 'ethers'
import { useCallback, useMemo, useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ABIJSON from 'src/abi/PostManager.json'
import { Header } from 'src/components/Header'
import { CONTRACT_ADDRESS } from 'src/constants/address'
import { useWalletStore } from 'src/stores'
import { fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { ABI, Element, FieldType } from './types'

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

const convert = (type: FieldType, input: string) => {
  if (type === 'uint256') {
    return BigNumber.from(input)
  }
  return input
}
const toOption = (
  stateMutability: Element['stateMutability'],
  gasLimit: string,
  value?: string,
) => ({
  value:
    stateMutability === 'payable' && value ? BigNumber.from(value) : undefined,
  gasLimit: stateMutability === 'view' ? undefined : gasLimit,
})

const DEFAULT_GAS_LIMIT = '4500000'

export const Client = () => {
  const { active, chainId, currentSigner } = useWalletStore()
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
  const call = useCallback(
    async (element: Element, data: { [x: string]: string }) => {
      if (!contract) throw new Error("Can't access to contract.")
      const func = contract[element.name]
      if (!func) throw new Error(`Function not found: ${element.name}`)
      const args = element.inputs.map(({ type }, idx) => {
        const input = data.args[idx]
        return convert(type, input)
      })
      const option = toOption(
        element.stateMutability,
        DEFAULT_GAS_LIMIT,
        data.value,
      )
      return func(...args, option)
    },
    [contract],
  )
  return (
    <Layout>
      <Header />
      <h2>VIEW</h2>
      {views.map((each) => (
        <Form key={each.name} element={each} active={active} call={call} />
      ))}
      <h2>NON-PAYABLE</h2>
      {nonpayable.map((each) => (
        <Form key={each.name} element={each} active={active} call={call} />
      ))}
      <h2>PAYABLE</h2>
      {payable.map((each) => (
        <Form key={each.name} element={each} active={active} call={call} />
      ))}
    </Layout>
  )
}

const Form: VFC<{
  element: Element
  active?: boolean
  call: (...args: any[]) => Promise<any>
}> = ({ element, active, call }) => {
  const methods = useForm()
  const { handleSubmit, register } = methods
  const [output, setOutput] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <FormProvider key={element.name} {...methods}>
      <form
        onSubmit={handleSubmit(async (data) =>
          call(element, data)
            .then(setOutput)
            .catch((e) => setErrorMessage(JSON.stringify(e))),
        )}
      >
        <Section>
          <div>
            <h3>{element.name}</h3>
            <button disabled={!active}>Call</button>
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Inputs>
            {element.stateMutability === 'payable' && (
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
