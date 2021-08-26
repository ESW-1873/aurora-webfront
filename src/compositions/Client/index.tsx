import { useMemo, useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ABIJSON from 'src/abi/PostManager.json'
import { Header } from 'src/components/Header'
import { CONTRACT_ADDRESS } from 'src/constants/address'
import { useWalletStore } from 'src/stores'
import { fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { ABIModel, ContractModel } from './models'
import { Element } from './types'

const abi = new ABIModel(JSON.stringify(ABIJSON))

const getContractAddress = (chainId: number) => {
  return CONTRACT_ADDRESS[chainId]
}

export const Client = () => {
  const { active, chainId, currentSigner } = useWalletStore()
  const contract = useMemo(
    () =>
      chainId && currentSigner
        ? new ContractModel({
            address: getContractAddress(chainId),
            abi: abi.abi,
            signerOrProvider: currentSigner,
          })
        : undefined,
    [chainId, currentSigner],
  )
  return (
    <Layout>
      <Header />
      <h2>PAYABLE</h2>
      {abi.payables.map((each) => (
        <Form
          key={each.name}
          element={each}
          active={active}
          call={contract?.call}
        />
      ))}
      <h2>NON-PAYABLE</h2>
      {abi.nonpayables.map((each) => (
        <Form
          key={each.name}
          element={each}
          active={active}
          call={contract?.call}
        />
      ))}
      <h2>VIEW</h2>
      {abi.views.map((each) => (
        <Form
          key={each.name}
          element={each}
          active={active}
          call={contract?.call}
        />
      ))}
    </Layout>
  )
}

const Form: VFC<{
  element: Element
  active?: boolean
  call?: (...args: any[]) => Promise<any>
}> = ({ element, active, call }) => {
  const methods = useForm()
  const { handleSubmit, register } = methods
  const [output, setOutput] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <FormProvider key={element.name} {...methods}>
      <form
        onSubmit={handleSubmit(
          async (data) =>
            call &&
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
