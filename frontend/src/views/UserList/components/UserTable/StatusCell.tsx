import React from 'react'
import { Tag } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const CellContainer = styled.div`
  display: flex;
  width: 100%;
`

export default function VerifyCell({ status }) {
  const { t } = useTranslation()
  return (
    <CellContainer>
      {status ? (
        <Tag variant="success" outline scale="md">
          {t('Active')}
        </Tag>
      ) : (
        <Tag variant="failure" outline scale="md">
          {t('Disable')}
        </Tag>
      )}
    </CellContainer>
  )
}
