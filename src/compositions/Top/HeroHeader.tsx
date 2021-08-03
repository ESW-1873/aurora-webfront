import React, { VFC } from 'react'
import { Image } from 'src/components/Image'
import styled from 'styled-components'

export const HeroHeader: VFC = () => {
  return (
    <>
      <ImageDiv>
        <Image
          src="/assets/images/top.png"
          alt="key visual"
          priority={true}
          loading="eager"
        />
      </ImageDiv>
    </>
  )
}

const ImageDiv = styled.div`
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
`
