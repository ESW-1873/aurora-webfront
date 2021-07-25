import React, { VFC } from 'react'
import { Member } from 'src/models/Team'
import { fontWeightBold, fontWeightRegular } from 'src/styles/font'
import { breakpoint } from 'src/styles/mixins'
import styled from 'styled-components'
import { HeadinCardProps, HeadingCard, MemberCard } from './Card'

type TeamPageLayoutProps = HeadinCardProps & {
  pageTitle: string
  pageDescription: string
  members: Member[]
}

export const TeamPageLayout: VFC<TeamPageLayoutProps> = ({
  pageTitle,
  pageDescription,
  teamType,
  message,
  members,
}) => (
  <>
    <MainSection>
      <Title>{pageTitle}</Title>
      <Description>{pageDescription}</Description>
      <CardLayoutDiv>
        <HeadingCard teamType={teamType} message={message} />
        {members.map((member) => (
          <MemberCard
            key={member.name}
            iconPath={member.iconPath}
            name={member.name}
            title={member.title}
            twitterId={member.twitterId}
          />
        ))}
      </CardLayoutDiv>
    </MainSection>
  </>
)

const MainSection = styled.section`
  padding-top: 45px;
`

const Title = styled.h2`
  font-size: 40px;
  font-weight: ${fontWeightBold};
  margin-bottom: 24px;
`

const Description = styled.p`
  font-size: 18px;
  font-weight: ${fontWeightRegular};
  letter-spacing: 0.024em;
  line-height: 1.67;
  margin-bottom: 56px;
`

const CardLayoutDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 29.6%);
  grid-gap: 56px 5.5%;
  justify-content: center;
  @media ${breakpoint.l} {
    grid-template-columns: repeat(2, min(47.25%, 320px));
  }
  @media ${breakpoint.m} {
    grid-template-columns: repeat(1, min(100%, 320px));
  }
`
