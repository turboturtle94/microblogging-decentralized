'use client'

import { Post } from '@/lib/types/Types'
import { useWallet } from '../components/WalletContext'

import PostCard from '@/components/Post'
import { useMemo, useState, KeyboardEvent } from 'react'

import postsData from '../lib/dummyData.json'
import { Button, TextField } from '@mui/material'

export default function FeedPage() {
  const [currentTextCount, setCurrentTextCount] = useState<number>(0)
  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  } as Post)
  const posts: Post[] = useMemo(() => {
    return postsData.map((post) => {
      return {
        ...post,
        timestamp: post.timestamp
      }
    })
  }, [])
  const { address } = useWallet()
  return (
    <div className='w-screen bg-purple-400 flex flex-col items-center gap-5 p-10'>
      <div className='p-5 flex flex-col gap-5 bg-purple-50 h-[20%] max-h-[20%] w-[80%] justify-center rounded-lg'>
        <TextField
          className='w-full'
          multiline
          rows={4}
          helperText={`${280 - currentTextCount} characters remaining`}
          placeholder='Say something that is on your mind'
          onKeyDown={(evt: KeyboardEvent<HTMLInputElement>) => {
            const target = evt.target as HTMLInputElement
            const currentCount = target.value.length
            if (currentCount >= 280) {
              evt.preventDefault()
            }
          }}
          onKeyUp={(evt: KeyboardEvent<HTMLInputElement>) => {
            const target = evt.target as HTMLInputElement
            const currentCount = target.value.length
            setCurrentTextCount(currentCount)
          }}
        ></TextField>
        <Button className='bg-purple-500 text-white'>Post</Button>
      </div>
      <div className='w-[80%] h-[80%] max-h-[80%] min-h-[80%] flex flex-col items-center gap-5'>
        {posts.map((post) => (
          <PostCard post={post} key={post.timestamp}></PostCard>
        ))}
      </div>
    </div>
  )
}
