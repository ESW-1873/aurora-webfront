import dynamic from 'next/dynamic'
import React, { VFC } from 'react'
import { ModelViewerProps } from 'src/components/ModelViewer'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'

const Model = dynamic<ModelViewerProps>(
  () => import('src/components/ModelViewer'),
  {
    ssr: false,
  },
)

type Props = {}
export const PreviewSection: VFC<Props> = () => (
  <Section>
    <Model
      src={`https://perm.auroradao-dev.tk/sample/0x98968f`}
      alt={`Preview Card`}
    />
  </Section>
)

const Section = styled.section`
  text-align: left;
  padding-top: 32px;
  padding-bottom: 64px;
  @media ${breakpoint.m} {
    padding-top: 24px;
    padding-bottom: 40px;
    h2,
    > label {
      margin-bottom: 24px;
    }
  }
`
