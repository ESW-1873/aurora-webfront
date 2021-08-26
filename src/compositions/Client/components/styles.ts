import styled, { css } from 'styled-components'

export const ErrorMessage = styled.div`
  margin-top: 12px;
  width: 100%;
  border: 1px dotted;
  padding: 12px;
  font-size: 14px;
  background-color: lightgray;
  color: darkred;
  word-break: break-all;
`

export const Output = styled.div`
  margin-top: 12px;
  width: 100%;
  border: 1px dotted;
  padding: 12px;
  font-size: 14px;
  background-color: lightgray;
  word-break: break-all;
`

export const ctaStyle = css`
  background-color: darkslategray;
  border-radius: 17px;
  width: 152px;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
