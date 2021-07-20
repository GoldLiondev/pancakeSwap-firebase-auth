import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Input } from '@pancakeswap/uikit'
import Content from './Content'

export interface ITableProps {
  data?: ''
  columns?: []
  userDataReady?: boolean
  sortColumn?: string
}

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
`

const TableWrapper = styled.div`
  overflow: visible;
  padding: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.div`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableContainer = styled.div`
  position: relative;
`
const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  input {
    width: 30%;
  }
`
const UserTable: React.FC<ITableProps> = () => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState('')

  return (
    <Container>
      <SearchContainer>
        <Input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
      </SearchContainer>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <Content searchValue={searchValue} />
          </StyledTable>
        </TableWrapper>
      </TableContainer>
    </Container>
  )
}

export default UserTable
