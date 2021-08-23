import React, { VFC } from 'react'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { useSpecificationModalStore } from 'src/stores'
import { fontWeightBold, fontWeightRegular } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import { DISCLAIMER } from 'src/utils/router'
import styled from 'styled-components'
import { Modal } from '..'
import { Heading } from '../common'

export const SpecificationModal: VFC<{ publish: VoidFunction }> = ({
  publish,
}) => {
  const { isOpen, close } = useSpecificationModalStore()
  return (
    <Modal isOpen={isOpen} closeModal={close}>
      <Layout>
        <Heading>Specification Description</Heading>
        <h3>01</h3>
        <p>The project will be automatically closed due to below.</p>
        <ul>
          <li>- Passed 72 hours since published.</li>
          <li>- Got 100,000 donations.</li>
        </ul>
        <h3>02</h3>
        <p>
          Once a project is published, it cannot be closed until the end of the
          project period.
        </p>
        <h3>03</h3>
        <p>
          Publisher must understand{' '}
          <a target="_blank" href={DISCLAIMER} rel="noreferrer">
            Disclaimer
          </a>
          .
        </p>
        <PrimaryButton label="Agree and Publish" onClick={publish} />
      </Layout>
    </Modal>
  )
}

const Layout = styled.div`
  ${flexCenter}
  flex-direction: column;

  h3 {
    margin-top: 36px;
    font-size: 24px;
    font-weight: ${fontWeightBold};
  }
  p {
    text-align: center;
    margin-top: 8px;
    font-size: 16px;
    font-weight: ${fontWeightRegular};
    line-height: 1.5;
  }
  ul {
    margin-top: 8px;
  }
  a {
    text-decoration: underline;
  }
  ${PrimaryButton} {
    margin-top: 48px;
  }
`
