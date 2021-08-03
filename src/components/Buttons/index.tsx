import { ButtonHTMLAttributes, VFC } from 'react'
import { fontWeightLight } from 'src/styles/font'
import { breakpoint, flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

type ButtonProps = {
  label: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const HeaderButton: VFC<ButtonProps> = ({ label, ...props }) => (
  <HeaderButtonElement {...props}>
    <HeaderLabelDiv>
      <LabelSpan data-text={label}>{label}</LabelSpan>
    </HeaderLabelDiv>
  </HeaderButtonElement>
)

export const Button: VFC<ButtonProps> = ({ label, ...props }) => (
  <DefaultButtonElement {...props}>
    <LabelDiv>
      <LabelSpan data-text={label}>{label}</LabelSpan>
    </LabelDiv>
  </DefaultButtonElement>
)

const HeaderButtonElement = styled.button`
  width: 152px;
  height: 34px;
  &,
  > * {
    border-radius: 17px;
  }
  position: relative;
`

const DefaultButtonElement = styled.button`
  width: 342px;
  height: 64px;
  &,
  > * {
    border-radius: 32px;
  }
`

const HeaderLabelDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${flexCenter};
  border: 1px solid;
`

const LabelDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${flexCenter};
`

const LabelSpan = styled.span`
  position: relative;
  font-size: 14px;
  font-weight: ${fontWeightLight};
  letter-spacing: 0em;

  @media ${breakpoint.s} {
    font-size: 14px;
  }
`
