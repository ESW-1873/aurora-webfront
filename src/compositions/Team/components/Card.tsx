import React, { VFC } from 'react'
import { CtaButton } from 'src/components/Buttons'
import { Image } from 'src/components/Image'
import { gray, pink, purple, white } from 'src/styles/colors'
import {
  fontWeightMedium,
  fontWeightRegular,
  fontWeightSemiBold,
} from 'src/styles/font'
import { absoluteFill, flexCenter } from 'src/styles/mixins'
import styled, { css } from 'styled-components'

export type HeadinCardProps = {
  teamType: 'Development' | 'Design' | 'Investment' | 'Promotion'
  message: string
}

export const HeadingCard: VFC<HeadinCardProps> = ({ teamType, message }) => (
  <HeadingCardContainer>
    <Heading>{`${teamType}\nTeam`}</Heading>
    <SubHeading>{message}</SubHeading>
    <CtaButton onClick={() => alert('TODO')} label="Contact" />
  </HeadingCardContainer>
)

const cardBaseStyle = css`
  border-radius: 24px;
  width: 320px;
  height: 358px;
  ${flexCenter};
  flex-direction: column;
`

const HeadingCardContainer = styled.div`
  ${cardBaseStyle};
  background-color: ${gray}55;
  text-align: center;
  line-height: 1.5;
`

const Heading = styled.h3`
  font-size: 32px;
  font-weight: ${fontWeightSemiBold};
  white-space: pre-wrap;
  margin-bottom: 24px;
`

const SubHeading = styled.p`
  font-weight: ${fontWeightRegular};
  letter-spacing: 0.016em;
  padding: 0 40px;
  margin-bottom: 32px;
`

//
//----------------------------------------------------------------------
//

type MemberCardProps = {
  iconPath: string
  name: string
  title: string
  twitterId: string
}

export const MemberCard: VFC<MemberCardProps> = ({
  iconPath,
  name,
  title,
  twitterId,
}) => (
  <MemberCardContainer>
    <MemberIconDiv>
      <MemberIconBack />
      <ImageDiv>
        <Image src={iconPath} alt="" />
      </ImageDiv>
    </MemberIconDiv>
    <MemberName>{name}</MemberName>
    <MemberTitle>{title}</MemberTitle>
    <MemberTwitterId
      as="a"
      href={`https://twitter.com/${twitterId}`}
      target="_blank"
    >
      {twitterId}
    </MemberTwitterId>
  </MemberCardContainer>
)

const MemberIconDiv = styled.div`
  position: relative;
  width: 152px;
  height: 152px;
  margin-bottom: 24px;
  &,
  > div {
    border-radius: 50%;
  }
`

const MemberIconBack = styled.div`
  ${absoluteFill};
  filter: brightness(115%);
`

const ImageDiv = styled.div`
  ${absoluteFill};
  width: 120px;
  height: 120px;
  overflow: hidden;
`

const MemberCardContainer = styled.div`
  ${cardBaseStyle};
  :nth-child(3n + 1) {
    background: ${purple}55;
    ${MemberIconBack} {
      background: linear-gradient(135deg, ${purple}55, ${pink}55);
    }
  }
  :nth-child(3n + 2) {
    background: linear-gradient(90deg, ${purple}55, ${pink}55);
    ${MemberIconBack} {
      background: linear-gradient(90deg, ${purple}55, ${pink}55);
    }
  }
  :nth-child(3n) {
    background: ${pink}55;
    ${MemberIconBack} {
      background: linear-gradient(135deg, ${purple}55, ${pink}55);
    }
  }
`

const MemberName = styled.h3`
  font-size: 24px;
  font-weight: ${fontWeightSemiBold};
  line-height: 1.5;
  margin-bottom: 8px;
`

const MemberTitle = styled.p`
  filter: brightness(150%);
  color: ${white}75;
  margin-bottom: 24px;
`

const MemberTwitterId = styled(MemberTitle)`
  font-weight: ${fontWeightMedium};
`
