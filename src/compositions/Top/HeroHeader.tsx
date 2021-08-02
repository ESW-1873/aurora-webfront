import React, { VFC } from 'react'
import { useMediaPredicate } from 'react-media-hook'
import { Image } from 'src/components/Image'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

export const HeroHeader: VFC = () => {
  const isSP = useMediaPredicate('(max-width: 480px)')
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
  z-index: -1;
  left: 0;
  width: 100%;
  height: 100%;
  @media ${breakpoint.m} {
    height: 0;
    padding-top: 100%;
  }
  @media screen and (min-width: 2000px) {
    height: 0;
    padding-top: 42.67%;
  }
`
