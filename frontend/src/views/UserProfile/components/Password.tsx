import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Input, Text, Button } from '@pancakeswap/uikit'
import useToast from 'hooks/useToast'
import { minLength } from 'utils/form-validation'
import firebaseClient from 'firebaseClient/firebase'
import { useAuth } from 'state/hooks'

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  gap: 15px;
`
const TextDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`
const FormDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
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
const PasswordRest: React.FC = () => {
  const { t } = useTranslation()
  const [oldPassword, setoldPassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [rePassword, setrePassword] = useState('')
  const { toastWarning, toastSuccess } = useToast()
  const { userEmail } = useAuth()

  const requestCallback = (event) => {
    event.preventDefault()
    if (oldPassword === '') {
      toastWarning(t('Validation Error'), t('Password must be at least 7 characters'))
      return
    }

    if (newPassword === '' || !minLength(newPassword, 7)) {
      toastWarning(t('Validation Error'), t('Password must be at least 7 characters'))
      return
    }
    if (rePassword !== newPassword) {
      toastWarning(t('Validation Error'), t('Please check your repassword.'))
      return
    }

    firebaseClient
      .auth()
      .signInWithEmailAndPassword(userEmail, oldPassword)
      .then((firebase) => {
        firebase.user
          .updatePassword(newPassword)
          .then(() => {
            toastSuccess(t('Password Change'), t('Your password was changed successfully'))
          })
          .catch((err) => toastWarning(t('Password Change Error'), err.message))
      })
      .catch((err) => toastWarning(t('Password Change Error'), err.message))
  }
  return (
    <>
      <FormDiv>
        <Row>
          <TextDiv>
            <Text>Old Password</Text>
          </TextDiv>
          <Input type="password" onChange={(e) => setoldPassword(e.target.value)} value={oldPassword} />
        </Row>
        <Row>
          <TextDiv>
            <Text>New Password</Text>
          </TextDiv>
          <Input type="password" onChange={(e) => setnewPassword(e.target.value)} value={newPassword} />
        </Row>
        <Row>
          <TextDiv>
            <Text>Password Confirm</Text>
          </TextDiv>
          <Input type="password" onChange={(e) => setrePassword(e.target.value)} value={rePassword} />
        </Row>
        <ActionRow>
          <Button scale="md" variant="primary" onClick={requestCallback}>
            {t('Save')}
          </Button>
        </ActionRow>
      </FormDiv>
    </>
  )
}

export default PasswordRest
