import React from 'react'
import { VerifiedIcon, WarningIcon, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'

const CellContainer = styled.div`
  display: flex;
  gap: 20px;
`
const StateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`
export default function VerifyCell({ verEmail, verKYC }) {
  return (
    <CellContainer>
      <StateDiv>
        {verEmail ? <VerifiedIcon /> : <WarningIcon />}
        <Text small>Email</Text>
      </StateDiv>
      <StateDiv>
        {verKYC ? <VerifiedIcon /> : <WarningIcon />}
        <Text small>KYC</Text>
      </StateDiv>
    </CellContainer>
  )
}
