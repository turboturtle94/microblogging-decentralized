'use client'

import { createContext, useContext, useState } from 'react'

const ProfileViewContext = createContext<any>(null)

export const useProfileView = () => useContext(ProfileViewContext)

export function ProfileViewProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [isInEditMode, setEditMode] = useState<boolean>(false)

  return (
    <ProfileViewContext.Provider value={{ isInEditMode, setEditMode }}>
      {children}
    </ProfileViewContext.Provider>
  )
}
