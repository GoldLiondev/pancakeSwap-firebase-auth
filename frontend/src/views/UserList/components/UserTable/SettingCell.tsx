import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { FaRegEye, FaRegTrashAlt } from 'react-icons/fa'
import { deleteUser } from 'action/users'
import { useModal } from '@pancakeswap/uikit'
import UserEdit from './UserEdit'

const CellContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;

  svg {
    width: 17px;
    height: 17px;
    cursor: pointer;
    fill: #007bff;

    :hover {
      fill: #20c997;
    }
  }
  position: relative;
`

export default function SettingCell({ data, handleReload }) {
  const [sending, setSending] = useState(false)
  const { toastWarning, toastSuccess } = useToast()
  const { t } = useTranslation()
  const [onPresent] = useModal(<UserEdit handleReload={handleReload} onDismiss userData={data} />)

  const { email } = data
  const handleRemove = () => {
    if (!sending) {
      setSending(true)
      deleteUser(email).then((result) => {
        const { success, message } = result
        if (success) {
          handleReload()
          toastSuccess(t('Delete'), t('That account is deleted.'))
        } else {
          toastWarning(t('Delete Error'), t(message))
        }
      })
    }
  }
  return (
    <CellContainer>
      <FaRegEye onClick={onPresent} />
      <FaRegTrashAlt onClick={handleRemove} />
    </CellContainer>
  )
}
