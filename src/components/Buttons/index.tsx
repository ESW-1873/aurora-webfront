import { ButtonHTMLAttributes, VFC } from 'react'
import { black, white } from 'src/styles/colors'
import { fontWeightMedium } from 'src/styles/font'
import { absoluteFill, defaultShadow, flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

type ButtonProps = {
  label: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const BlurBackedButton: VFC<ButtonProps> = ({ label, ...props }) => (
  <ButtonElement {...props}>
    <BlurredBack />
    <LabelDiv>
      <LabelSpan data-text={label}>{label}</LabelSpan>
    </LabelDiv>
  </ButtonElement>
)

const ButtonElement = styled.button`
  width: 124px;
  height: 40px;
  &,
  > * {
    border-radius: 16px;
  }
  position: relative;
`

const BlurredBack = styled.div`
  ${absoluteFill};
  background-color: ${white};
  filter: blur(5px);
  box-shadow: ${defaultShadow} inset;
`

const LabelDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${black};
  ${flexCenter};
`

const LabelSpan = styled.span`
  position: relative;
  font-size: 16px;
  font-weight: ${fontWeightMedium};
  letter-spacing: 0.016em;

  ::before {
    content: attr(data-text);
    ${absoluteFill};
    filter: blur(8px);
  }
`
