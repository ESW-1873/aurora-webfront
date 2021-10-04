import React, { VFC } from 'react'
import { Model } from 'src/components/Modal/ModelViewerModal'
import { fontWeightBold } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import { PREVIEW_CARD_ASSETS_ENDPOINT } from 'src/utils/env'
import styled from 'styled-components'

type Props = {
  postId: string
}
export const PreviewSection: VFC<Props> = ({ postId }) => (
  <Section>
    <Label>An NFT you can get by donating</Label>
    <Model
      src={`${PREVIEW_CARD_ASSETS_ENDPOINT}/sample/${postId}`}
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
  }
`

const Label = styled.p`
  font-size: 20px;
  font-weight: ${fontWeightBold};
  line-height: 1.2;
  letter-spacing: 0;
  margin-bottom: 14px;
`
