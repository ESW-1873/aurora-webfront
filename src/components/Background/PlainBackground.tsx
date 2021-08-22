import React, { VFC } from 'react'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

export const PlainBackground: VFC<{ backgroundColor: string }> = ({
  backgroundColor,
}) => <BlurredBackgroundDiv backgroundColor={backgroundColor} />

const BlurredBackgroundDiv = styled.div<{ backgroundColor: string }>`
  position: fixed;
  inset: 0;
  background-color: ${({ backgroundColor }) => backgroundColor};
  @media ${breakpoint.m} {
    display: none;
  }
`
