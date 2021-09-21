import type { VFC } from 'react'
import { Image } from 'src/components/Image'
import { breakpoint, noGuide } from 'src/styles/mixins'
import styled from 'styled-components'

type Props = {
  imageUrl: string
}

/**
 * Sample Card Image を表示する Section
 *
 * @returns ReactNode
 */
export const SampleCardSection: VFC<Props> = ({ imageUrl }) => (
  <Section>
    <h3>Sample Card</h3>
    <ImageDiv>
      <Image src={imageUrl} alt="sample visual" />
    </ImageDiv>
  </Section>
)

const Section = styled.section`
  padding-bottom: 24px;
  h3 {
    margin-bottom: 8px;
  }
  @media ${breakpoint.m} {
    padding-bottom: 12px;
    h3 {
      margin-bottom: 8px;
    }
  }
`

const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 66.7%;
  @media ${breakpoint.m} {
    ${noGuide}
    width: 100vw;
  }
`
