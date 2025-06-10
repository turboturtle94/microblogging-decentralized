'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography
} from '@mui/material'
import { Post } from '@/lib/types/Types'

export default function PostCard({ post }: { post: Post }) {
  const router = useRouter()
  return (
    <div className='w-[100%] flex gap-0 flex-col'>
      <Card
        sx={{
          width: '100%',
          minHeight: 100,
          borderRadius: 2,
          cursor: 'pointer'
        }}
        onClick={() => {
          router.push(`/post/${1}`)
        }}
      >
        <CardHeader
          avatar={
            <Avatar>
              <img
                src='/demoimage.png'
                alt='User'
                className='w-full h-full object-cover'
              />
            </Avatar>
          }
          title={<h2 className='text-bold text-lg'>{post.useraddress}</h2>}
          subheader={
            <div className='flex items-center justify-start text-sm text-gray-500'>
              <span>{post.timestamp}</span>
            </div>
          }
        />
        <CardContent>
          <Typography variant='body1'>{post.content}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
