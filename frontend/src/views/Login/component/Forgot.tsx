import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Input, Text, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { isEmail, isEmpty } from 'utils/form-validation'
import useToast from 'hooks/useToast'
import firebaseClient from 'firebaseClient/firebase'

const CellContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 15px;
`
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  gap: 15px;
`
const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  button {
    margin-left: 10px;
  }
`
const TextDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 200px;
`
export default function UserEdit({ onDismiss }) {
  const { t } = useTranslation()
  const [userEmail, setUserEmail] = useState('')
  const { toastWarning, toastSuccess } = useToast()

  const requestCallback = () => {
    if (isEmpty(userEmail)) {
      toastWarning(t('Validation Error'), t('Please enter the your email.'))
      return
    }
    if (!isEmail(userEmail)) {
      toastWarning(t('Validation Error'), t('This doesn’t look like e-mail please check it again.'))
      return
    }
    firebaseClient
      .auth()
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        toastSuccess(t('Reset Password'), 'The email was sent successfully, Please check your email')
      })
      .catch(() => {
        toastWarning(t('Reset Password Error'), 'There are some issuse for reset password')
      })
    onDismiss()
  }

  return (
    <Modal title={t('Reset passoword')} onDismiss={onDismiss}>
      <CellContainer>
        <Row>
          <TextDiv>
            <Text>Email</Text>
          </TextDiv>
          <Input
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
        </Row>
        <ActionRow>
          <Button scale="md" variant="primary" onClick={requestCallback}>
            {t('Send')}
          </Button>
          <Button scale="md" variant="primary" onClick={onDismiss}>
            {t('Cancel')}
          </Button>
        </ActionRow>
      </CellContainer>
    </Modal>
  )
}
