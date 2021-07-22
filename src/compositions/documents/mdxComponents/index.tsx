import { ReactNode } from 'react'
import { Link } from './Link'
import { ListItem, OrderedList, UnOrderedList } from './List'
import { Table, TableCell, TableRow } from './Table'
import { Heading1, Heading2, Paragraph, Strong } from './Text'

export const components: Record<string, ReactNode> = {
  h1: Heading1,
  h2: Heading2,
  p: Paragraph,
  a: Link,
  strong: Strong,
  ol: OrderedList,
  ul: UnOrderedList,
  li: ListItem,
  table: Table,
  tr: TableRow,
  td: TableCell,
} as const
