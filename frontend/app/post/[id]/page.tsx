'use client'

import { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Post } from '@/lib/types/Types'
import { Avatar, Button, TextField } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment'

import axios from 'axios'
import { formatTimestamp, snakeToCamel } from '@/lib/utils'

export default function PostCard({ params }: { params: { id: string } }) {
  const { id } = params
  const [showCommentField, toggleCommentField] = useState<boolean>(false)
  const [post, setPost] = useState({
    id: 0,
    title: '',
    content: '',
    comments: [],
    useraddress: '',
    hasUserLiked: false,
    timestamp: '',
    user: {
      username: '',
      profilePicUrl: '',
      bio: '',
      walletAddress: ''
    }
  } as Post)

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:3001/posts/${id}`)
          const postData = snakeToCamel(response.data)
          setPost(postData)
        } catch (error) {
          console.error('Failed to fetch post:', error)
        }
      }
    }

    fetchPost()
  }, [id])

  return (
    <div className='w-full min-h-screen bg-purple-400 flex justify-center p-4 sm:p-10'>
      <div className='bg-white w-full sm:w-[95%] md:w-[85%] lg:w-[70%] rounded-xl shadow-lg p-6 flex flex-col gap-6'>
        {/* Post Header */}
        <div className='flex items-center gap-4'>
          <Avatar className='w-12 h-12'>
            {post.user.profilePicUrl ? (
              <img
                src={post.user.profilePicUrl}
                alt='User'
                className='w-full h-full object-cover'
              />
            ) : (
              <span>{post.user.username.charAt(0)}</span>
            )}
          </Avatar>
          <div>
            <div className='text-sm font-semibold text-gray-800'>
              {post.user.username}
            </div>
            {/* <div className='text-xs text-gray-500'>
              {formatTimestamp(post.timestamp)}
            </div> */}
          </div>
        </div>

        {/* Post Content */}
        <div className='text-gray-700 whitespace-pre-line leading-relaxed text-base'>
          {post.content}
        </div>

        {/* Action Buttons */}
        <div className='flex gap-6 items-center'>
          <FavoriteIcon className='cursor-pointer text-purple-600 hover:scale-110 transition-transform' />
          <AddCommentIcon
            className='cursor-pointer text-purple-600 hover:scale-110 transition-transform'
            onClick={() => toggleCommentField(!showCommentField)}
          />
        </div>

        {/* Comment Input */}
        {showCommentField && (
          <div className='flex flex-col gap-3'>
            <TextField
              multiline
              rows={4}
              placeholder='Add your comment...'
              className='bg-white w-full'
              InputProps={{
                className: 'rounded-lg bg-white'
              }}
            />
            <Button
              className='w-28 bg-purple-500 hover:bg-purple-600 text-white normal-case'
              variant='contained'
            >
              Comment
            </Button>
          </div>
        )}

        {/* Comments Section */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-lg font-bold border-b pb-2 text-gray-800'>
            Comments ({post.comments.length})
          </h2>
          {post.comments.map((comment, index) => (
            <div
              key={index}
              className='flex flex-col gap-2 px-4 py-3 rounded-lg bg-purple-50'
            >
              <div className='flex items-center gap-3'>
                <Avatar className='w-10 h-10'>
                  <img
                    src={comment.user.profilePicUrl}
                    alt='User'
                    className='w-full h-full object-cover'
                  />
                </Avatar>
                <div>
                  <div className='text-sm font-semibold text-gray-800'>
                    {comment.user.username}
                  </div>
                  <div className='text-xs text-gray-500'>
                    {formatTimestamp(comment.timestamp)}
                  </div>
                </div>
              </div>
              <p className='pl-12 text-gray-700 text-sm'>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
