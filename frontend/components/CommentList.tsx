'use client'

import { Comment } from '@/lib/types/Types'
import { Avatar } from '@mui/material'

import { formatTimestamp } from '@/lib/utils'

export default function CommentsList({
  comments
}: {
  comments: Array<Comment>
}) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg font-bold border-b pb-2 text-gray-800'>
        Comments ({comments.length})
      </h2>
      {comments.map((comment, index) => (
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
              {comment.timestamp && (
                <div className='text-xs text-gray-500'>
                  {formatTimestamp(comment.timestamp)}
                </div>
              )}
            </div>
          </div>
          <p className='pl-12 text-gray-700 text-sm'>{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
