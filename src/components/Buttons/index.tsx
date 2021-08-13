import { ButtonHTMLAttributes, VFC } from 'react'
import { darkpurple } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

type ButtonProps = {
  label: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const HeaderButton: VFC<ButtonProps> = ({ label, ...props }) => (
  <HeaderButtonElement {...props}>
    <HeaderLabelDiv>
      <LabelSpan>{label}</LabelSpan>
    </HeaderLabelDiv>
  </HeaderButtonElement>
)

export const Button: VFC<ButtonProps> = ({ label, ...props }) => (
  <DefaultButtonElement {...props}>
    <LabelDiv>
      <LabelSpan>{label}</LabelSpan>
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

const LabelDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${flexCenter};
`

const HeaderLabelDiv = styled(LabelDiv)`
  border: 1px solid ${darkpurple};
`

const LabelSpan = styled.span`
  font-size: 14px;
  font-weight: ${fontWeightMedium};
`
