'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

// Helper to read cookie value
function getCookieValue(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match?.[2]
}

const WalletContext = createContext<{
  walletAddress: string | undefined
  setWalletAddress: (address: string | undefined) => void
}>({
  walletAddress: undefined,
  setWalletAddress: () => {}
})

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddressState] = useState<string | undefined>()

  // Load from cookie on mount
  useEffect(() => {
    const cookieAddress = getCookieValue('jwt')
    if (cookieAddress) {
      setWalletAddressState(cookieAddress)
    }
  }, [])

  const setWalletAddress = (address: string | undefined) => {
    setWalletAddressState(address)
  }

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
