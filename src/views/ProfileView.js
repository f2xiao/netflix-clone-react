import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'

function ProfileView() {
  const user = useSelector(selectUser)
  return (
    <div>ProfileView
      <p>{user.email}</p>
    </div>
  )
}

export default ProfileView