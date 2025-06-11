'use client'

import { useEffect, useState, use } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Post } from '@/lib/types/Types'
import { Avatar, Button, TextField } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment'

import axios from 'axios'
import { formatTimestamp, snakeToCamel } from '@/lib/utils'

import { useProfileView } from '@/components/UserProfileContext'

import { useParams } from 'next/navigation'
import CommentsList from './CommentList'

export default function PostDetail() {
  const params = useParams()
  const id = params?.id as string
  const { userProfile } = useProfileView()
  const [currentUser, setCurrentUser] = useState({
    username: '',
    bio: '',
    profilePicUrl: '',
    walletAddress: ''
  })
  const [showCommentField, toggleCommentField] = useState<boolean>(false)
  const [newComment, setNewComment] = useState('')
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
    setCurrentUser({ ...userProfile })
  }, [userProfile])

  useEffect(() => {
    fetchPost()
  }, [id])

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

  const addComment = async () => {
    try {
      await axios.post(`http://localhost:3001/posts/${post.id}/comment`, {
        wallet_address: currentUser.walletAddress,
        content: newComment,
        timeStamp: new Date().toISOString()
      })
    } catch (e) {
      alert('Failed to add a comment!')
      console.log('Comment API failue', e)
    }
  }

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
            {post.timestamp && (
              <div className='text-xs text-gray-500'>
                {formatTimestamp(post.timestamp)}
              </div>
            )}
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
            onClick={() => {
              toggleCommentField(!showCommentField)
            }}
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
              onChange={(evt) => {
                setNewComment(evt.target.value)
              }}
              value={newComment || ''}
            />
            <Button
              className='w-28 bg-purple-500 hover:bg-purple-600 text-white normal-case'
              variant='contained'
              onClick={async () => {
                await addComment()
                await fetchPost()
                setNewComment('')
                toggleCommentField(!showCommentField)
              }}
            >
              Comment
            </Button>
          </div>
        )}

        {/* Comments Section */}
        <CommentsList comments={post.comments}></CommentsList>
      </div>
    </div>
  )
}
