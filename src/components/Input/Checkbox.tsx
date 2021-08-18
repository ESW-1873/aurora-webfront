import { InputHTMLAttributes, VFC } from 'react'
import { black, white } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { DISCLAIMER } from 'src/utils/router'
import styled, { css, keyframes } from 'styled-components'

type Props = {
  id: string
  setIsChecked: (checked: boolean) => void
} & InputHTMLAttributes<HTMLInputElement>

export const DisclaimerCheckbox: VFC<Props> = ({
  id,
  setIsChecked,
  ...props
}) => {
  return (
    <CheckboxWrapper>
      <input
        {...props}
        type="checkbox"
        id={id}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label htmlFor={id}>
        I understand{' '}
        <a target="_blank" href={DISCLAIMER} rel="noreferrer">
          Disclaimer
        </a>
        .
      </label>
    </CheckboxWrapper>
  )
}

const check = keyframes`
  0% {
    clip-path: inset(100% 100% 0 0);
  }
  50% {
    clip-path: inset(80% 0 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
`

const checkStyle = css`
  ::before {
    border: unset;
    background: ${white};
  }
  ::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 4.5px;
    height: 12.5px;
    border-right: 2.5px solid;
    border-bottom: 2.5px solid;
    transform: rotate(45deg);
    color: ${black};
    opacity: 1;
  }
`
const CheckboxWrapper = styled.div`
  ${flexCenter}
  font-size: 16px;
  letter-spacing: 0.016em;
  line-height: 1.5;
  text-align: center;
  input[type='checkbox'] {
    display: none;
  }
  a {
    color: inherit;
    text-decoration: underline;
  }
  label {
    padding-left: 20px;
    position: relative;
    cursor: pointer;
    ::before {
      content: '';
      position: absolute;
      box-sizing: border-box;
      top: 4px;
      left: -4px;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid ${white};
    }
  }

  input[type='checkbox']:checked + label {
    ${checkStyle};
    ::after {
      animation: ${check} 0.2s ease-in;
    }
  }
`
