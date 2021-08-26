import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { IconClose } from 'src/assets/svgs'
import { ModelViewerProps } from 'src/components/ModelViewer'
import { PageWrapper } from 'src/compositions/PageWrapper'
import { MOCK_MODEL_URL } from 'src/data/__mocks__'
import { black, primaryColor, white } from 'src/styles/colors'
import { fontWeightBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled, { keyframes } from 'styled-components'
const Model = dynamic<ModelViewerProps>(
  () => import('src/components/ModelViewer'),
  {
    ssr: false,
  },
)
const SandboxPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  return (
    <>
      <PageWrapper>
        <Layout>
          <h2>Receipt NFT Test Page</h2>
          <button
            onClick={async () => {
              setIsOpen(true)
            }}
          >
            {isOpen ? 'Close' : 'Get Receipt'}
          </button>
        </Layout>
      </PageWrapper>
      {isOpen && (
        <Overlay onClick={() => setIsOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Model
              src={MOCK_MODEL_URL}
              // poster="assets/tmp/poster.jpg"
              alt="receipt card"
              onLoad={(props) => console.log('loaded', props)}
              onProgress={(props) => console.log('progress', props)}
            />
            <StyledIconClose onClick={() => setIsOpen(false)} />
          </div>
        </Overlay>
      )}
    </>
  )
}

const StyledIconClose = styled(IconClose)`
  width: 32px;
  height: 32px;
  fill: ${white};
  position: absolute;
  top: 5%;
  right: 10%;
  cursor: pointer;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Overlay = styled.div`
  ${flexCenter}
  position: fixed;
  inset: 0;
  overflow: hidden;
  background-color: ${black}bf;
  z-index: 1000;
  animation: ${fadeIn} 1s linear;
  > div {
    position: absolute;
    width: 80%;
    height: 80%;
  }
`

const Layout = styled.div`
  width: 100%;
  /* > div {
    height: 540px;
  } */
  ${flexCenter}
  flex-direction: column;
  > h2 {
    margin-bottom: 16px;
  }

  > button {
    width: 320px;
    height: 64px;
    border-radius: 16px;
    background: ${primaryColor};
    color: ${white};
    font-size: 24px;
    font-weight: ${fontWeightBold};
    text-align: center;
    margin-bottom: 16px;
  }
`

export default SandboxPage
