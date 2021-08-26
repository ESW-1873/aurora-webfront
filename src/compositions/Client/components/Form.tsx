import { forwardRef, InputHTMLAttributes, useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { Element, FieldType } from '../types'

export const Form: VFC<{
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
