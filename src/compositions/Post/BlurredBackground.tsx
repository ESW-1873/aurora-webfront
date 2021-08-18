import React, { VFC } from 'react'
import { Image } from 'src/components/Image'
import { MOCK_POST } from 'src/constants/tmp/post'
import { white } from 'src/styles/colors'
import { absoluteFill, breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

export const BlurredBackground: VFC = () => (
  <BlurredBackgroundDiv>
    <Image src={MOCK_POST.image} alt="keyvisual" />
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
