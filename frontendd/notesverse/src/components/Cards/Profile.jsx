import React from 'react'
import { getInitials } from '../../utils/helper'

const Profile = ({userInfo, onLogout}) => {
  // If no userInfo, show loading or return null
  if (!userInfo) {
    return null; // Or return a loading spinner
  }

  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-bold bg-slate-100'>
        {getInitials(userInfo.fullName)}
      </div>
      <div>
        <p className='text-sm font-bold'>{userInfo.fullName}</p>
        <button 
          className='text-sm text-slate-700 underline' 
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile