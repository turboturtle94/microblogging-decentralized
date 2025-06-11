'use client'

import { useWallet } from '@/components/WalletContext'

import ProfileView from '@/components/ProfileViewer'
import ProfileEditView from '@/components/ProfileEditor'

import { User, UserApi } from '@/lib/types/Types'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { snakeToCamel } from '@/lib/utils'
import { useProfileView } from '@/components/UserProfileContext'

export default function UserProfilePage() {
  const { userProfile } = useProfileView()
  const [user, setUser] = useState<User>({
    username: '',
    walletAddress: '',
    profilePicUrl: '',
    bio: ''
  })

  useEffect(() => {
    setUser({ ...userProfile })
  }, [userProfile])

  return (
    <main className='w-full min-h-screen bg-purple-100 flex flex-col items-center p-4 sm:p-10'>
      <div className='w-full max-w-5xl'>
        <ProfileView user={user} />
      </div>

      {/* Separator Line */}
      <div className='w-full max-w-5xl border-t border-purple-300 my-4'></div>

      <div className='w-full max-w-5xl'>
        <ProfileEditView userApi={{ user, updateUser: setUser }} />
      </div>
    </main>
  )
}
