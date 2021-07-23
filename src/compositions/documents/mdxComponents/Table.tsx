import {
  Table as TableProps,
  TableCell as TableCellProps,
  TableRow as TableRowProps,
} from 'mdast'
import React, { VFC } from 'react'
import styled from 'styled-components'

export const Table: VFC<TableProps> = ({ children }) => (
  <StyledTable>{children}</StyledTable>
)
export const TableRow: VFC<TableRowProps> = ({ children }) => (
  <StyledTableRow>{children}</StyledTableRow>
)
export const TableCell: VFC<TableCellProps> = ({ children }) => (
  <StyledTableCell>{children}</StyledTableCell>
)

const StyledTable = styled.table`
  margin-top: 24px;
  width: 100%;
  th {
    padding: 0.5em;
    font-size: 16px;
  }
`
const StyledTableRow = styled.tr`
  border: 1px solid;
`

const StyledTableCell = styled.td`
  font-size: 14px;
  padding: 0.5em;
  min-width: 50%;
  :not(:first-child) {
    border-left: 1px solid;
  }
`
