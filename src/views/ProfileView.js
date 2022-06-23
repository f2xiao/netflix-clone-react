import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, logout } from '../features/user/userSlice'

function ProfileView() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div>ProfileView
      <p>{user.email}</p>
      <button
        onClick={()=>{dispatch(logout())}}
      >Sign out</button>
    </div>
  )
}

export default ProfileView