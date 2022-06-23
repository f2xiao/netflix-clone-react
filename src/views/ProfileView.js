import React from 'react'
import {  useSelector } from 'react-redux'
import styled from 'styled-components';
import { selectUser } from '../features/user/userSlice'
function ProfileView({handleClick}) {
  const user = useSelector(selectUser);
  
  return (
    <ProfileViewContainer>
      <ProfileContainer>
        <h1>
          Edit Profile 
        </h1>
        <hr />
        <ProfileContentContainer>
          <img />
          <ProfileContent>
            <h3>{user.email}</h3>
            <h2>Plans (Current Plan:)</h2>
            
            <button type='button' onClick={(e)=>{handleClick(e)}}>Sign out</button>
           
          </ProfileContent>
        </ProfileContentContainer>
      </ProfileContainer>
    </ProfileViewContainer>
  )
}

export default ProfileView

const flexbox = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const ProfileViewContainer = styled(flexbox)`
margin-top: 5.2em;
`
const ProfileContainer = styled.div`
`
const ProfileContentContainer = styled(flexbox)`

`
const ProfileContent = styled.div``
