import React, { VFC } from 'react'
import { Image } from 'src/components/Image'
import { white } from 'src/styles/colors'
import { absoluteFill, breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

export const BlurredBackground: VFC<{ imageUrl: string }> = ({ imageUrl }) => (
  <BlurredBackgroundDiv>
    <Image src={imageUrl} alt="keyvisual" />
    <BlurFilter />
  </BlurredBackgroundDiv>
)

const BlurredBackgroundDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
  padding-top: 66.7%;
  @media ${breakpoint.m} {
    display: none;
  }
`

const BlurFilter = styled.div`
  ${absoluteFill}
  background: ${white}0d;
  backdrop-filter: blur(8px) brightness(105%);
`
