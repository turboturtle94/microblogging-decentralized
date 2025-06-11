'use client'

import { Post } from '@/lib/types/Types'
import { useWallet } from '@/components/WalletContext'
import PostCard from '@/components/PostCard'

import { useEffect, useState, KeyboardEvent } from 'react'
import axios from 'axios'

import { Button, TextField } from '@mui/material'

import { snakeToCamel } from '@/lib/utils'

export default function FeedPage() {
  const [currentTextCount, setCurrentTextCount] = useState<number>(0)
  const [newPost, setNewPost] = useState<Post>({ content: '' } as Post)
  const [posts, setPosts] = useState<Post[]>([])

  const { walletAddress } = useWallet()

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts')
        setPosts(snakeToCamel(response.data))
      } catch (error) {
        console.error('Failed to fetch posts', error)
        alert('Unable to load posts!')
      }
    }

    fetchPosts()
  }, [])

  const handlePost = async () => {
    if (!walletAddress || !newPost.content.trim()) return

    try {
      const response = await axios.post('http://localhost:3001/posts', {
        wallet_address: walletAddress,
        content: newPost.content
      })

      setPosts((prev) => [response.data, ...prev])
      setNewPost({ content: '' } as Post)
      setCurrentTextCount(0)
    } catch (error) {
      console.error('Failed to post content', error)
      alert('Could not post content!')
    }
  }

  return (
    <div className='w-screen min-h-screen bg-purple-100 flex flex-col items-center gap-6 p-4 sm:p-10'>
      {/* Post Input */}
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col gap-4'>
        <TextField
          className='w-full'
          multiline
          rows={4}
          value={newPost.content}
          helperText={`${280 - currentTextCount} characters remaining`}
          placeholder='Say something that is on your mind...'
          onChange={(e) => {
            const text = e.target.value
            if (text.length <= 280) {
              setNewPost({ ...newPost, content: text })
              setCurrentTextCount(text.length)
            }
          }}
        />
        <div className='flex justify-end'>
          <Button
            className='bg-purple-500 text-white'
            variant='contained'
            onClick={handlePost}
          >
            Post
          </Button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className='w-full max-w-4xl px-2 sm:px-0 flex flex-col gap-6 pt-2'>
        {posts.length === 0 ? (
          <p className='text-center text-gray-500'>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.timestamp?.toString()}
              className='w-full bg-white rounded-lg shadow-md p-4'
            >
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
