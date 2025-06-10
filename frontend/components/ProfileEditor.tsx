'use client'

import { useProfileView } from '@/components/UserProfileContext'

import { UserApi } from '@/lib/types/Types'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useState } from 'react'

export default function ProfileEditView(props: { userApi: UserApi }) {
  const { setEditMode } = useProfileView()
  const { user, updateUser } = props.userApi as UserApi
  const [imageLoaded, setImageLoaded] = useState(
    'https://i.postimg.cc/MTvMpqZ0/demoimage.avif'
  )
  return (
    <div className='flex flex-col gap-5 bg-purple-50 w-[80%] h-[80%] rounded-lg p-10 overflow-y-auto'>
      <TextField
        label='Username'
        defaultValue={user.username}
        required
        className='border-purple-400 bg-white'
      ></TextField>
      <TextField
        label='Bio'
        defaultValue={user.bio}
        multiline
        rows={5}
        required
        className='border-purple-400 bg-white'
      ></TextField>
      <TextField
        label='Profile pic'
        defaultValue={imageLoaded}
        onChange={(e) => {
          setImageLoaded(e.target.value)
        }}
        className='border-purple-400 bg-white'
      ></TextField>
      {imageLoaded && (
        <div className='w-1/2 h-full relative overflow-hidden'>
          <img
            src={imageLoaded}
            className='w-full h-full object-cover object-top'
          ></img>
        </div>
      )}
      <div className='flex gap-2'>
        <Button
          className='border-purple-400 text-white bg-purple-500 cursor-pointer w-[80px]'
          onClick={() => {
            setEditMode(false)
          }}
        >
          Done
        </Button>
        <Button
          className='border-purple-400 text-purple-500 cursor-pointer w-[80px]'
          onClick={() => {
            setEditMode(false)
          }}
          variant='outlined'
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
