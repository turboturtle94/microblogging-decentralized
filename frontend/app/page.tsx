"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit'

import { useAccount, useSignMessage } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'

export default function Home() {
  const router = useRouter()

  const { isConnected, address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const [loginStatus, setLoginStatus] = useState<number>(1)
  const [jwt, setJwt] = useState<string | null>(null)

  useEffect(() => {
    const loginStatus = getLoginStatus()
    setLoginStatus(loginStatus)
  }, [isConnected, jwt])

  const getLoginStatus = () => {
    if (!isConnected) {
      return 1
    } else if (isConnected && !jwt) {
      return 2
    } else {
      return 3
    }
  }

  const getComponentToRender = (state: number): ReactNode => {
    switch (state) {
      case 1:
        return <ConnectButton />
      case 2:
        return (
          <Button
            className='bg-purple-400 text-white border-0'
            onClick={handleLogin}
          >
            Sign Message to Login
          </Button>
        )
      default:
        return <></>
    }
  }

  useEffect(() => {
    if (loginStatus === 3) {
      goToProfilePage()
    } else {
      goToHome()
    }
  }, [loginStatus])

  const handleLogin = async () => {
    try {
      const signature = await signMessageAsync({
        message: `Login to Microblogger with address: ${address}`
      })
      if (true) {
        setJwt('some-jwt-token') // Simulate JWT token setting
        setLoginStatus(3)
      } else {
        setLoginStatus(1)
        setJwt(null)
      }
    } catch (error) {}
  }

  const goToProfilePage = () => {
    router.push('/userprofile')
  }

  const goToHome = () => {
    router.push('/')
  }

  return (
    <main>
      <div className='w-screen h-screen flex p-2 box-border justify-center'>
        <div className='w-screen h-screen bg-[url(/homepage.jpg)] bg-cover bg-center absolute inset-0 z-0 opacity-[70%]'></div>
        <div className='mt-[10%] relative z-10'>
          <h1 className='text-6xl font-bold mb-4 flex justify-center items-center text-gray-600'>
            Microblogger
          </h1>
          <section className='flex flex-col items-center'>
            <p className='text-lg  mb-4 italic font-bold text-gray-600'>
              This is your chill, Web3-powered spot to drop thoughts, updates,
              and hot takes—no middlemen, no drama. Just connect your wallet,
              post what’s on your mind.
            </p>
            {loginStatus === 1 || loginStatus === 2 ? (
              getComponentToRender(loginStatus)
            ) : (
              <></>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
