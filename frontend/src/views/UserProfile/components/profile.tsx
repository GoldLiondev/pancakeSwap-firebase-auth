import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import MyProfile from './MyProfile'
import Password from './Password'

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
  padding: 25px;
`
const MenuDiv = styled.div`
  padding-bottom: 20px;
`
const ProfileForm: React.FC = () => {

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const [page, setPage] = useState(0)
  const handleClick = () => (page === 0 ? setPage(1) : setPage(0))

  return (
    <Container>
      <MenuDiv>
        <ButtonMenu activeIndex={page} onItemClick={handleClick}>
          <ButtonMenuItem>User Profile</ButtonMenuItem>
          <ButtonMenuItem>Change Password</ButtonMenuItem>
        </ButtonMenu>
      </MenuDiv>
      {page === 0 ? <MyProfile /> : <Password />}
    </Container>
  )
}

export default ProfileForm
