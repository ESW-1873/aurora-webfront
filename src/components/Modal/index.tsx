import React, { ReactNode, useEffect, VFC } from 'react'
import { black, white } from 'src/styles/colors'
import { breakpoint } from 'src/styles/mixins'
import { disableScroll, enableScroll } from 'src/utils/handleScroll'
import styled from 'styled-components'

type Props = {
  isOpen: boolean
  children: ReactNode
  closeModal?: () => void
}

export const Modal: VFC<Props> = ({ isOpen, closeModal, children }) => {
  useEffect(() => {
    if (isOpen) {
      disableScroll()
    }
    return () => enableScroll()
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <Overlay onClick={closeModal ?? undefined}>
          <div onClick={(e) => e.stopPropagation()}>
            <Contents>{children}</Contents>
          </div>
        </Overlay>
      )}
    </>
  )
}

const Overlay = styled.div`
  position: fixed;
  overflow: hidden;
  inset: 0;
  background-color: ${black}80;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Contents = styled.div`
  max-width: 400px;
  width: 50vw;
  padding: 40px 66px 48px 66px;
  position: relative;
  border-radius: 32px;
  background-color: ${white}80;
  backdrop-filter: blur(30px) brightness(150%);

  @media ${breakpoint.l} {
    width: 80vw;
  }
  @media ${breakpoint.s} {
    width: 85vw;
    padding-right: 24px;
    padding-left: 24px;
  }
`
