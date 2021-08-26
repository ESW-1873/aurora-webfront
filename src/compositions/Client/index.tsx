import { forwardRef, InputHTMLAttributes, useMemo, useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Header } from 'src/components/Header'
import { useWalletStore } from 'src/stores'
import { fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { ABIModel, ContractModel } from './models'
import { Element, FieldType } from './types'

export const Client = () => {
  const [abiJson, setAbiJson] = useState<string>()
  const [abiJsonUrl, setAbiJsonUrl] = useState('')
  const [abiJsonLabel, setAbiJsonLabel] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const { active, currentSigner } = useWalletStore()
  const abi = useMemo(
    () => (abiJson ? new ABIModel(JSON.parse(abiJson)) : undefined),
    [abiJson],
  )
  const contract = useMemo(
    () =>
      contractAddress && abi && currentSigner
        ? new ContractModel({
            address: contractAddress,
            abi: abi.abi,
            signerOrProvider: currentSigner,
          })
        : undefined,
    [contractAddress, abi, currentSigner],
  )
  return (
    <Layout>
      <Header />
      <div>
        <div>
          Contarct Address: {contractAddress}{' '}
          <input
            value={contractAddress}
            onChange={({ target: { value } }) => setContractAddress(value)}
          />
        </div>
        <div>
          ABI: {abiJsonLabel}
          <div>
            from URL:
            <input
              value={abiJsonUrl}
              onChange={({ target: { value } }) => setAbiJsonUrl(value)}
            />
            <button
              onClick={() =>
                fetch(abiJsonUrl).then((res) =>
                  res.text().then((data) => {
                    const json = JSON.parse(data)
                    if (Array.isArray(json)) {
                      setAbiJson(data)
                    } else {
                      json.address && setContractAddress(json.address)
                      json.abi && setAbiJson(JSON.stringify(json.abi))
                    }
                    setAbiJsonLabel(abiJsonUrl)
                    setAbiJsonUrl('')
                  }),
                )
              }
            >
              Load
            </button>
          </div>
          or
          <div>
            <label>
              Upload
              <input
                type="file"
                onChange={({ target: { files } }) => {
                  if (!files) return
                  const filename = files[0]
                  filename.text().then((data) => {
                    const json = JSON.parse(data)
                    if (Array.isArray(json)) {
                      setAbiJson(data)
                    } else {
                      json.address && setContractAddress(json.address)
                      json.abi && setAbiJson(JSON.stringify(json.abi))
                    }
                    setAbiJsonLabel(filename.name)
                  })
                }}
                hidden
              />
            </label>
          </div>
        </div>
      </div>
      {abi && (
        <>
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
        </>
      )}
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
        onSubmit={handleSubmit((data) => {
          if (!call) return
          setOutput(undefined)
          setErrorMessage('')
          return call(element, data)
            .then(setOutput)
            .catch((e) => setErrorMessage(JSON.stringify(e)))
        })}
      >
        <Section>
          <div>
            <h3>{element.name}</h3>
            <button disabled={!active}>Call</button>
          </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Inputs>
            {element.stateMutability === 'payable' && (
              <Input
                label="value"
                fieldType="uint256"
                {...register(`value`, { required: true })}
              />
            )}
            {element.inputs.map((each, idx, arr) => {
              const name =
                each.name || (arr.length > 1 ? `key${idx + 1}` : 'key')
              return (
                <Input
                  key={name}
                  label={name}
                  fieldType={each.type}
                  {...register(`args[${idx}]`, { required: true })}
                />
              )
            })}
          </Inputs>
          {output != null && <Output>{JSON.stringify(output)}</Output>}
        </Section>
      </form>
    </FormProvider>
  )
}

type InputProps = {
  label: string
  fieldType: FieldType
} & InputHTMLAttributes<HTMLInputElement>
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, fieldType, ...props }, ref) => (
    <label>
      <p>
        {label}: <span>{fieldType}</span>
      </p>
      <input {...props} ref={ref} />
    </label>
  ),
)

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
