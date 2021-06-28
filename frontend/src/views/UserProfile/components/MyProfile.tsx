import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Input, Text, VerifiedIcon, WarningIcon, Button } from '@pancakeswap/uikit'
import { useSetProfile, useUserProfile } from 'state/hooks'
import { updateProfile } from 'action/users'
import useToast from 'hooks/useToast'
import { isEmpty } from 'utils/form-validation'

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 15px;
  @media screen and (max-width: 420px) {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  } ;
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
const ProfileForm: React.FC = () => {
  const { t } = useTranslation()
  const [DEmail, setEmail] = useState('')
  const [DverEmail, setEmailVerify] = useState(false)
  const [DverKYC, setKYCVerify] = useState(false)
  const [DuserName, setUserName] = useState('')
  const [Dmobile, setMobile] = useState('')
  const [Ddob, setDob] = useState('')

  const [reload, setReload] = useState(true)

  useSetProfile(reload)
  const { profile } = useUserProfile()
  const { toastWarning, toastSuccess } = useToast()

  useEffect(() => {
    let { email, email_verified_at: verEmail, kyc_verified_at: verKYC, name, mobile, dateOfBirthDay } = profile
    email = isEmpty(email) ? '' : email
    verEmail = isEmpty(verEmail) ? '' : verEmail
    verKYC = isEmpty(verKYC) ? '' : verKYC
    name = isEmpty(name) ? '' : name
    mobile = isEmpty(mobile) ? '' : mobile
    dateOfBirthDay = isEmpty(dateOfBirthDay) ? '' : dateOfBirthDay
    setEmailVerify(verEmail)
    setKYCVerify(verKYC)
    setEmail(email)
    setUserName(name)
    setMobile(mobile)
    setDob(dateOfBirthDay)
  }, [profile])

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const handleChange = (type, value) => {
    switch (type) {
      case 'userName':
        setUserName(value)
        break
      case 'moblie':
        setMobile(value)
        break
      case 'dob':
        setDob(value)
        break
      default:
        break
    }
  }

  const requestCallback = () => {
    const data = { email: DEmail, userName: DuserName, mobile: Dmobile, dob: Ddob }
    updateProfile(data).then((result) => {
      const { success, message } = result
      if (success) {
        toastSuccess(t('Update'), t('Updated Successfully'))
      } else {
        toastWarning(t('Update Profile Error'), t(message))
      }
      setReload(!reload)
    })
  }
  return (
    <>
      <FormDiv>
        <Row>
          <TextDiv>
            <Text fontSize="20px">User Email</Text>
          </TextDiv>
          <Text>{DEmail}</Text>
        </Row>
        <Row>
          <TextDiv>
            <Text fontSize="20px">UserName</Text>
          </TextDiv>
          <Input
            value={DuserName}
            onChange={(e) => {
              handleChange('userName', e.target.value)
            }}
          />
        </Row>
        <Row>
          <TextDiv>
            <Text fontSize="20px">Moblie</Text>
          </TextDiv>
          <Input
            type="number"
            value={Dmobile}
            onChange={(e) => {
              handleChange('moblie', e.target.value)
            }}
          />
        </Row>
        <Row>
          <TextDiv>
            <Text fontSize="20px">BirthDay</Text>
          </TextDiv>
          <Input
            type="date"
            value={Ddob}
            onChange={(e) => {
              handleChange('dob', e.target.value)
            }}
          />
        </Row>

        <Row>
          <TextDiv>
            <Text fontSize="20px">Email Verified: </Text>
          </TextDiv>
          {DverEmail ? <VerifiedIcon /> : <WarningIcon />}
        </Row>

        <Row>
          <TextDiv>
            <Text fontSize="20px">KYC Verified: </Text>
          </TextDiv>
          {DverKYC ? <VerifiedIcon /> : <WarningIcon />}
        </Row>

        <ActionRow>
          <Link to="/submitKyc">
            <Button scale="md" variant="danger">
              {t('Submit KYC')}
            </Button>
          </Link>
          <Button scale="md" variant="primary" onClick={requestCallback}>
            {t('Save')}
          </Button>
        </ActionRow>
      </FormDiv>
    </>
  )
}

export default ProfileForm
