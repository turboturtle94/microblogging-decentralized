'use client'

import { UserApi } from '@/lib/types/Types'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useEffect, useState } from 'react'

import axios from 'axios'

export default function ProfileEditView(props: { userApi: UserApi }) {
  const { user, updateUser } = props.userApi
  const [userData, setUserData] = useState({
    username: '',
    bio: '',
    profilePicUrl: '',
    walletAddress: ''
  })
  const [imageLoaded, setImageLoaded] = useState(user.profilePicUrl || '')
  useEffect(() => {
    setUserData(user)
    setImageLoaded(user.profilePicUrl)
  }, [user])
  const update = async () => {
    try {
      await axios.post(`http://localhost:3001/users/`, {
        username: userData.username,
        bio: userData.bio,
        profile_pic_url: userData.profilePicUrl,
        wallet_address: userData.walletAddress
      })
    } catch (err) {
      console.error('Error updating user', err)
      alert('Profile update failed!')
    }
  }
  return (
    <div className='flex flex-col gap-5 bg-purple-50 w-full rounded-lg p-6 sm:p-10 shadow-md'>
      <TextField
        label='Username'
        value={userData.username || ''}
        required
        fullWidth
        className='bg-white'
        onChange={(e) => {
          setUserData({
            ...userData,
            username: e.target.value
          })
        }}
      />
      <TextField
        label='Bio'
        value={userData.bio || ''}
        multiline
        rows={5}
        required
        fullWidth
        className='bg-white'
        onChange={(e) => {
          setUserData({
            ...userData,
            bio: e.target.value
          })
        }}
      />
      <TextField
        label='Profile pic'
        value={imageLoaded || ''}
        onChange={(e) => {
          setUserData({
            ...userData,
            profilePicUrl: e.target.value
          })
          setImageLoaded(e.target.value)
        }}
        fullWidth
        className='bg-white'
      />
      <div className='flex gap-2 mt-4'>
        <Button
          variant='contained'
          className='bg-purple-500 text-white'
          onClick={async () => {
            await update()
            updateUser(userData)
          }}
        >
          Done
        </Button>
        <Button
          variant='outlined'
          className='text-purple-500 border-purple-500'
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}