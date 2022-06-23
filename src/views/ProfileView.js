import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { selectUser, logout } from '../features/user/userSlice'
import { auth } from '.././firebase.js';
import { signOut } from "firebase/auth"

function ProfileView() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signout = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(logout());
    }).catch((error) => {
      // An error happened.
    });
   }
  return (
    <ProfileViewContainer>

    <div>ProfileView
      <p>{user.email}</p>
      <button type=''
        onClick={(e)=>{signout(e)}}
      >Sign out</button>
    </div>
    </ProfileViewContainer>
  )
}

export default ProfileView
const ProfileViewContainer = styled.div`
margin-top: 4em;
`
