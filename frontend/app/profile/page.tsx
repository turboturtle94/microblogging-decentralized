'use client'

import { useWallet } from '@/components/WalletContext'
import { useProfileView } from '@/components/UserProfileContext'

import ProfileView from '@/components/ProfileViewer'
import ProfileEditView from '@/components/ProfileEditor'

import { User, UserApi } from '@/lib/types/Types'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { snakeToCamel } from '@/lib/utils'

export default function UserProfilePage() {
  const { walletAddress } = useWallet()
  const [user, setUser] = useState<User>({
    username: '',
    walletAddress: '',
    profilePicUrl: '',
    bio: ''
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${walletAddress}`
        )
        const userData = snakeToCamel(response.data)
        setUser(userData)
      } catch (err) {
        console.error('Failed to load profile', err)
        alert('Failed to load user profile!')
      }
    }

    if (walletAddress) {
      fetchUserData()
    }
  }, [walletAddress])

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
