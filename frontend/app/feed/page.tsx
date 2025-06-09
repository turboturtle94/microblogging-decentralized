'use client'

import { Post } from '@/lib/types/Types'
import { useWallet } from '../../components/WalletContext'

import PostCard from '@/components/Post'
import { useMemo } from 'react'

import postsData from '../../lib/dummyData.json'

export default function FeedPage() {
  const posts: Post[] = useMemo(() => {
    return postsData.map((post) => {
      return {
        ...post,
        timestamp: new Date(post.timestamp)
      }
    })
  }, [])
  const { address } = useWallet()
  return (
    <div className='w-screen bg-purple-400 flex flex-col items-center gap-5 p-10 max-h-screen overflow-y-auto'>
      {posts.map((post) => (
        <PostCard post={post} key={post.timestamp.toTimeString()}></PostCard>
      ))}
    </div>
  )
}
