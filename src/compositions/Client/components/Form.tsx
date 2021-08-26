import { forwardRef, InputHTMLAttributes, useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { fontWeightRegular, fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { FieldType, Method, MethodDoc } from '../types'
import { ctaStyle, ErrorMessage, Output } from './styles'

export const Form: VFC<{
  method: Method
  doc?: MethodDoc
  active?: boolean
  call?: (...args: any[]) => Promise<any>
}> = ({ method, doc, active, call }) => {
  const methods = useForm()
  const { handleSubmit, register } = methods
  const [output, setOutput] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <FormProvider key={method.name} {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          if (!call) return
          setOutput(undefined)
          setErrorMessage('')
          return call(method, data)
            .then(setOutput)
            .catch((e) => setErrorMessage(JSON.stringify(e, null, 4)))
        })}
      >
        <Section>
          <Caption>
            <h3>{method.name}</h3>
            <Doc>{doc?.details || ''}</Doc>
          </Caption>
          <CollapsableDiv>
            <Inputs>
              {!method.inputs.length && method.stateMutability !== 'payable' && (
                <NoParams>
                  <p>No Params</p>
                </NoParams>
              )}
              {method.stateMutability === 'payable' && (
                <Input
                  label="value"
                  fieldType="uint256"
                  doc="transferring amount"
                  {...register(`value`, { required: true })}
                />
              )}
              {method.inputs.map((each, idx, arr) => {
                const name =
                  each.name || (arr.length > 1 ? `key${idx + 1}` : 'key')
                return (
                  <Input
                    key={name}
                    label={name}
                    fieldType={each.type}
                    doc={doc?.params?.[name]}
                    {...register(`args[${idx}]`, { required: true })}
                  />
                )
              })}
              <button disabled={!active}>Call</button>
            </Inputs>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {output != null && (
              <Output>{JSON.stringify(output, null, 4)}</Output>
            )}
          </CollapsableDiv>
        </Section>
      </form>
    </FormProvider>
  )
}

type InputProps = {
  label: string
  fieldType: FieldType
  doc?: string
} & InputHTMLAttributes<HTMLInputElement>
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, fieldType, doc, ...props }, ref) => (
    <label>
      <div>
        {label}: <span>{fieldType}</span>
        <Doc>{doc}</Doc>
      </div>
      <input {...props} ref={ref} />
    </label>
  ),
)

const Doc = styled.p`
  display: block;
  font-size: 18px;
  font-weight: ${fontWeightRegular};
  line-height: 1;
`

const Section = styled.details`
  margin-top: 20px;
  font-size: 24px;
  border: 1px solid;
`
const CollapsableDiv = styled.div`
  border-top: 1px solid;
`
const Caption = styled.summary`
  display: block;
  cursor: pointer;
  h3 {
    font-size: 24px;
    font-weight: ${fontWeightSemiBold};
    padding: 4px 8px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ${Doc} {
    margin: 4px 16px;
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
  display: flex;
  padding: 12px 56px 24px;
  flex-direction: column;
  label {
    width: 100%;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    span {
      font-style: italic;
    }
    input {
      border: 1px solid;
      padding: 4px 8px;
    }
    > * {
      width: 100%;
      max-width: 320px;
    }
  }
  ${Doc} {
    margin: 0 8px;
  }
  button {
    margin-top: 20px;
    margin-left: auto;
    ${ctaStyle};
  }
`
const NoParams = styled.label`
  opacity: 0.75;
  font-style: italic;
`
