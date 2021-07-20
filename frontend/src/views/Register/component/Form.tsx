import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Input, Button } from '@pancakeswap/uikit'
import history from 'routerHistory'
import { isEmail, maxLength, minLength, isEmpty } from 'utils/form-validation'
import useToast from 'hooks/useToast'
import { signUp } from 'action/auth'
import { auth } from 'firebaseClient/firebase'

const FromDiv = styled.div`
  & > input {
    margin-bottom: 20px;
  }
  margin-bottom: 20px;
`
const ActionDiv = styled.div`
  button {
    width: 100%;
  }
`
const RegisterForm: React.FC = () => {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [repassword, setRepass] = useState('')
  const { toastWarning, toastSuccess } = useToast()

  const requestCallback = (event) => {
    event.preventDefault()
    if (name === '' || !maxLength(name, 40)) {
      toastWarning(t('Validation Error'), t('Please enter the your name correctly.'))
      return
    }
    if (email === '') {
      toastWarning(t('Validation Error'), t('Please enter the your email.'))
      return
    }
    if (!isEmail(email)) {
      toastWarning(t('Validation Error'), t('This doesn’t look like e-mail please check it again.'))
      return
    }

    if (password === '' || !minLength(password, 7)) {
      toastWarning(t('Validation Error'), t('Password must be at least 7 characters'))
      return
    }
    if (repassword !== password) {
      toastWarning(t('Validation Error'), t('Please check your repassword.'))
      return
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.sendEmailVerification()
        signUp(email, name).then((data) => {
          if (isEmpty(data.success)) return
          if (data.success) {
            toastSuccess(t('Register'), t('You are registered successfully.'))
            history.push('/login')
          } else {
            toastWarning(t('Register Error'), data.message)
          }
        })
      })
      .catch((err) => {
        toastWarning(t('Register Error'), err.message)
      })
  }
  const handleChange = (type, value) => {
    switch (type) {
      case 'name':
        setName(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPass(value)
        break
      case 'repassword':
        setRepass(value)
        break
      default:
        break
    }
  }

  return (
    <FromDiv>
      <Input value={name} placeholder="Your Name" scale="lg" onChange={(e) => handleChange('name', e.target.value)} />
      <Input
        value={email}
        type="email"
        placeholder="Your Email"
        scale="lg"
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <Input
        value={password}
        type="password"
        placeholder="Password"
        scale="lg"
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <Input
        value={repassword}
        type="password"
        placeholder="Repeat Password"
        scale="lg"
        onChange={(e) => handleChange('repassword', e.target.value)}
      />
      <ActionDiv>
        <Button scale="md" variant="primary" onClick={requestCallback}>
          {t('Create Account')}
        </Button>
      </ActionDiv>
    </FromDiv>
  )
}

export default RegisterForm
