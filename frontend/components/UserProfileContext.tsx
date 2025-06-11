'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { useWallet } from '@/components/WalletContext'

import axios from 'axios'

import { snakeToCamel } from '@/lib/utils'
import { User } from '@/lib/types/Types'

const ProfileContext = createContext<any>(null)

export const useProfileView = () => useContext(ProfileContext)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { walletAddress } = useWallet()
  const [userProfile, setUserProfile] = useState<User>()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${walletAddress}`
        )
        const userData = snakeToCamel(response.data)
        setUserProfile(userData)
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
    <ProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}
