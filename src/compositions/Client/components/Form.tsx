import { forwardRef, InputHTMLAttributes, useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { fontWeightSemiBold } from 'src/styles/font'
import styled from 'styled-components'
import { Element, FieldType } from '../types'
import { ctaStyle, ErrorMessage, Output } from './styles'

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
          <Caption>
            <h3>{element.name}</h3>
          </Caption>
          <CollapsableDiv>
            <Inputs>
              {!element.inputs.length && element.stateMutability !== 'payable' && (
                <NoParams>
                  <p>No Params</p>
                </NoParams>
              )}
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
              <button disabled={!active}>Call</button>
            </Inputs>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {output != null && <Output>{JSON.stringify(output)}</Output>}
          </CollapsableDiv>
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

const Section = styled.details`
  margin-top: 20px;
  font-size: 24px;
  border: 1px solid;
`
const CollapsableDiv = styled.div`
  border-top: 1px solid;
`
const Caption = styled.summary`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  h3 {
    font-size: 24px;
    font-weight: ${fontWeightSemiBold};
    padding: 4px 8px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
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
