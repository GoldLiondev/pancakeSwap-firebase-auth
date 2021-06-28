import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Input, Text, Toggle, Button, VerifiedIcon, WarningIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { isEmpty } from 'utils/form-validation'
import { updateUser } from 'action/users'
import useToast from 'hooks/useToast'
import Select, { OptionProps } from 'components/Select/Select'

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
  @media screen and (max-width: 420px) {
    width: auto;
  }
`
const ToogleDiv = styled.div`
  align-items: center;
  display: flex;
  gap: 15px;
`
export default function UserEdit({ onDismiss, userData, handleReload }) {
  const { t } = useTranslation()
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [verEmail, setVerEmail] = useState(false)
  const [verKyc, setVerKyc] = useState(false)
  const [role, setRole] = useState(false)
  const [status, setStatus] = useState(false)
  const [userlastLogin, setLastLogin] = useState('')
  const { toastWarning, toastSuccess } = useToast()

  useEffect(() => {
    const {
      email,
      lastLogin,
      name,
      role: dataRole,
      status: dataStatus,
      verKYC: dataVerKyc,
      verEmail: dataVerEmial,
    } = userData
    const loginDate = isEmpty(lastLogin) ? 'Not Logged yet' : new Date(lastLogin)
    const rolevalue = dataRole === 'admin'
    setUserEmail(email)
    setUserName(name)
    setRole(rolevalue)
    setStatus(dataStatus)
    setVerKyc(dataVerKyc)
    setVerEmail(dataVerEmial)
    setLastLogin(loginDate.toString())
  }, [userData])

  const requestCallback = () => {
    const data = { verEmail, verKyc, role, status, userEmail }
    updateUser(data).then((result) => {
      const { success, message } = result
      if (success) {
        handleReload()
        toastSuccess(t('Update'), t('Updated Successfully'))
      } else {
        toastWarning(t('Delete Error'), t(message))
      }
      onDismiss()
    })
  }
  const handleSortOptionChange = (option: OptionProps): void => {
    setRole(option.value)
  }
  return (
    <Modal title={t('User Info')} onDismiss={onDismiss}>
      <CellContainer>
        <Row>
          <TextDiv>
            <Text>Email</Text>
          </TextDiv>
          <Input value={userEmail} readOnly />
        </Row>
        <Row>
          <TextDiv>
            <Text>Name</Text>
          </TextDiv>
          <Input value={userName} readOnly />
        </Row>
        <Row>
          <TextDiv>
            <Text>Last Login</Text>
          </TextDiv>
          <Input value={userlastLogin} readOnly />
        </Row>
        <Row>
          <TextDiv>
            <Text>Email Verify</Text>
          </TextDiv>
          <ToogleDiv>
            {verEmail ? <VerifiedIcon /> : <WarningIcon />}
            <Text> {verEmail ? 'Verified' : 'Not Verified'}</Text>
          </ToogleDiv>
        </Row>
        <Row>
          <TextDiv>
            <Text>KYC Verify</Text>
          </TextDiv>
          <ToogleDiv>
            <Toggle onChange={() => setVerKyc(!verKyc)} checked={verKyc} />
            <Text> {verKyc ? 'Verified' : 'Not Verified'}</Text>
          </ToogleDiv>
        </Row>
        <Row>
          <TextDiv>
            <Text>Role</Text>
          </TextDiv>
          <ToogleDiv>
            <Select
              selected={role}
              options={[
                {
                  label: t('Admin'),
                  value: true,
                },
                {
                  label: t('User'),
                  value: false,
                },
              ]}
              onChange={handleSortOptionChange}
            />
          </ToogleDiv>
        </Row>
        <Row>
          <TextDiv>
            <Text>Status</Text>
          </TextDiv>
          <ToogleDiv>
            <Toggle onChange={() => setStatus(!status)} checked={status} />
            <Text> {status ? 'Active' : 'Disable'}</Text>
          </ToogleDiv>
        </Row>
        <ActionRow>
          <Button scale="md" variant="primary" onClick={requestCallback}>
            {t('Save')}
          </Button>
          <Button scale="md" variant="primary" onClick={onDismiss}>
            {t('Cancel')}
          </Button>
        </ActionRow>
      </CellContainer>
    </Modal>
  )
}
