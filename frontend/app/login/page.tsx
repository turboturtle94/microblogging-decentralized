'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'

import { useAccount, useSignMessage } from 'wagmi'
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'

import axios from 'axios'
import { useWallet } from '@/components/WalletContext'

export default function Login() {
  const router = useRouter()
  const { walletAddress, setWalletAddress } = useWallet()
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
    } else if (isConnected && !walletAddress) {
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
      goToHome()
    } else {
      goToLogin()
    }
  }, [loginStatus])

  const handleLogin = async () => {
    try {
      const message = `Login to Microblogger with address: ${address}`
      const signature = await signMessageAsync({
        message
      })

      const response = await axios.post('http://localhost:3001/auth/verify', {
        address,
        signature,
        message
      })
      const { address: token } = response.data
      if (token) {
        document.cookie = `jwt=${token}; path=/; max-age=3600` // expires in 1 hour
        setLoginStatus(3)
        setWalletAddress(token)
        await createUserData(token)
      } else {
        setLoginStatus(1)
      }
    } catch (error) {
      console.log(JSON.stringify(error))
      alert('Login failed!')
    }
  }

  const createUserData = async (address: string) => {
    try {
      await axios.get(`http://localhost:3001/users/${address}`)
    } catch (err: any) {
      if (err.response?.status === 404) {
        // 3. Create new user
        console.log('User does not exist. Creating...')
        await axios.post('http://localhost:3001/users', {
          wallet_address: address,
          username: 'Anonymous',
          bio: 'Hey there! 🚀 Your profile’s looking great, but it needs a little *you*.✨ Tell the world a bit about yourself—go ahead and update your bio!✨ Tell the world a bit about yourself—go ahead and update your bio!',
          profile_pic_url: ''
        })
      } else {
        throw err // Other errors
      }
    }
  }

  const goToLogin = () => {
    router.push('/login')
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
