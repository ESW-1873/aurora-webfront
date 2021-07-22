import { List, ListItem as ListItemProps } from 'mdast'
import React, { VFC } from 'react'
import styled from 'styled-components'

export const OrderedList: VFC<List> = ({ children }) => (
  <StyledOrderedList>{children}</StyledOrderedList>
)
export const UnOrderedList: VFC<List> = ({ children }) => (
  <StyledUnOrderedList>{children}</StyledUnOrderedList>
)
export const ListItem: VFC<ListItemProps> = ({ children }) => (
  <StyledListItem>{children}</StyledListItem>
)
const StyledListItem = styled.li`
  :not(:first-child) {
    margin-top: 4px;
  }
`
const StyledOrderedList = styled.ol`
  margin-top: 24px;
  margin-left: 2em;
  list-style: decimal;
`
const StyledUnOrderedList = styled.ul`
  margin-top: 24px;
  margin-left: 2em;
  list-style: unset;
`
