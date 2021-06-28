import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Heading, Text, useModal } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import Form from './component/Form'
import Forgot from './component/Forgot'

const PageImageDiv = styled.div`
  background: url(/images/login-bg.png) #342d6e no-repeat;
  background-repeat: no-repeat;
  ${({ theme }) => theme.mediaQueries.lg} {
    background-position: left center, right center;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
const ImageContent = styled.div`
  width: 100%;
`
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 76px;
`
const HeadingDiv = styled.div`
  padding-bottom: 20px;
`
const LinkItem = styled.span`
  :hover {
    color: #7a6eaa;
    cursor: pointer;
  }
`
const ForgotDiv = styled.div`
  padding: 10px 0;
`
const Login: React.FC = () => {
  const { t } = useTranslation()
  const [onPresent] = useModal(<Forgot onDismiss />)

  return (
    <Container>
      <PageImageDiv>
        <ImageContent />
      </PageImageDiv>
      <FormContainer>
        <HeadingDiv>
          <Heading as="h1" scale="xxl" mb="15px" color="secondary">
            {t('Sign In')}
          </Heading>
          <Text fontSize="23px">{t('with your TokenLite Account')}</Text>
        </HeadingDiv>
        <Form />
        <div>
          Don&lsquo;t have an account?
          <Link to="/register">
            <LinkItem> Sign up </LinkItem>
          </Link>
          here
        </div>
        <ForgotDiv>
          If you forgot your password, please
          <LinkItem
            onClick={() => {
              onPresent()
            }}
          >
            {' '}
            Click here
          </LinkItem>
        </ForgotDiv>
      </FormContainer>
    </Container>
  )
}

export default Login
