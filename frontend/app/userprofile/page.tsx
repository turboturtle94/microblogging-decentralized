'use client'

import { useWallet } from '../../components/WalletContext'

import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'

import ProfileView from '@/app/userprofile/profileview'
import ProfileEditView from '@/app/userprofile/editprofile'

import { useProfileView } from '@/components/UserProfileContext'

import { User, UserApi } from '@/lib/types/Types'

export default function UserProfilePage() {
  const { address } = useWallet()
  const { isInEditMode, setEditMode } = useProfileView()
  const user = {
    username: 'Edward Newgate',
    bio: `Writing code by day, singing in the shower by night. Occasionally
          seen turning bugs into features and coffee into art. Software dev
          with a side hustle in high notes and brush strokes. I break loops
          and paint moods — sometimes in the same hour. Ctrl + Z is my love
          language.`,
    profilePicUrl: ''
  } as User
  return (
    <main className='w-screen h-screen bg-purple-400 flex items-center justify-center relative gap-10'>
      {!isInEditMode && (
        <Button
          variant='outlined'
          startIcon={<EditIcon />}
          className='absolute top-[10%] left-[85%] mt-[5px] border-purple-400 text-white bg-purple-500 cursor-pointer z-10'
          onClick={() => {
            setEditMode(true)
          }}
        >
          Edit
        </Button>
      )}
      {isInEditMode ? (
        <ProfileEditView
          userApi={{ user, updateUser: () => {} } as UserApi}
        ></ProfileEditView>
      ) : (
        <ProfileView user={user}></ProfileView>
      )}
    </main>
  )
}
