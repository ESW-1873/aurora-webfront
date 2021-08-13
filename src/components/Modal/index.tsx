import React, { ReactNode, useEffect, VFC } from 'react'
import { IconClose } from 'src/assets/svgs'
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
    disableScroll()
    return () => enableScroll()
  }, [])

  return (
    <>
      {isOpen && (
        <Overlay onClick={closeModal ?? undefined}>
          <div onClick={(e) => e.stopPropagation()}>
            <Contents>
              {closeModal && <StyledIconClose onClick={closeModal} />}
              {children}
            </Contents>
          </div>
        </Overlay>
      )}
    </>
  )
}

const StyledIconClose = styled(IconClose)`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`

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
  max-width: 480px;
  width: 50vw;
  padding: 64px;
  position: relative;
  border-radius: 24px;
  background-color: ${white}26;
  backdrop-filter: blur(30px) brightness(115%);
  > div {
    max-width: 352px;
    margin: 0 auto;
  }
  @media ${breakpoint.l} {
    width: 75vw;
  }
  @media ${breakpoint.m} {
    width: 80vw;
    padding-right: 42px;
    padding-left: 42px;
  }
  @media ${breakpoint.s} {
    width: 85vw;
    padding-right: 16px;
    padding-left: 16px;
  }
`
