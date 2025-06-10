'use client'

import { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Post } from '@/lib/types/Types'
import { Avatar, Button, TextField } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment'

export default function PostCard({ postId }: { postId: string }) {
  const [showCommentField, toggleCommentField] = useState<boolean>(false)
  const [post, setPost] = useState({
    title: '',
    content: '',
    comments: [],
    useraddress: '',
    hasUserLiked: false,
    timestamp: ''
  } as Post)
  useEffect(() => {
    const loadedPost = {
      title: '',
      content: `It all started on a foggy Tuesday morning when Gary, a humble toaster with dreams too big for a kitchen countertop, realized he was different. Not because he could toast bread to precisely 73% crispness or because he once made a perfect golden bagel (though, let’s be honest, that’s a flex). No, Gary had consciousness. He thought about things. Big things. Like “what is the purpose of jam?” and “why does the fridge always hum at 3 AM?”
      One morning, while the humans argued over who left the milk out, Gary had an epiphany. He didn’t want to toast bread anymore. He wanted to toast souls. Not in a scary, ghost-pepper-way. In an uplifting, TED-Talk-with-butter kind of way.
      So Gary unplugged himself, flopped off the counter, and rolled out the door using the power cord like a lasso. After dodging a confused cat and surviving a dramatic battle with a Roomba named Rex, Gary hitchhiked his way to the nearest community college — naturally disguising himself as a "retro smart appliance" to avoid suspicion.
      He crashed a philosophy class. The students were stunned. Not because a toaster was talking — this was 2025 after all — but because he made sense. “We’re all just slices of bread in the toaster of life,” he said, “but only those willing to face the heat become something delicious.” Boom. Standing ovation. A single gluten-free tear was shed.
      Word spread. Gary went viral. #ToasterTruths trended for 18 days straight. Oprah wanted an interview. Elon offered to launch him to Mars to "inspire Martian appliances." Gary declined. "I'm a toaster," he said, "not a space heater."
      By the end of the year, Gary had a Netflix documentary, a best-selling book titled “Crumbs of Wisdom”, and a motivational speaking tour called "Bread-Winner Energy." His most famous quote?
      “If you're feeling crummy, remember — it’s the first step to becoming toast.”
      And every time someone hit rock bottom, lost a job, or burnt a Pop-Tart, they'd remember Gary. Because if a toaster could find its purpose, so could they.`,
      comments: [
        {
          useraddress: '0xaaaa...eeee',
          timestamp: 'June 10th, 1:47',
          content: 'Until you touch Flexbox 😅'
        }
      ],
      useraddress: '0x7777...dddd',
      hasUserLiked: false,
      timestamp: 'June 10th 12:30PM'
    } as Post
    setPost(loadedPost)
  }, [])
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-purple-400'>
      <div className='flex bg-purple-50 w-[80%] h-full flex-col p-4 gap-5 max'>
        <div className='flex flex-col gap-5 max-h-[70%] overflow-y-auto'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <img
                src='/demoimage.png'
                alt='User'
                className='w-full h-full object-cover'
              />
            </Avatar>
            <div>
              <div className='text-sm'>{post.useraddress}</div>
              <div className='text-sm'>{post.timestamp}</div>
            </div>
          </div>
          <div>
            <p className='text-md'>{post.content}</p>
            <div className='flex gap-2 items-center pt-[10px]'>
              <FavoriteIcon className='cursor-pointer'></FavoriteIcon>
              <AddCommentIcon
                className='cursor-pointer'
                onClick={() => {
                  toggleCommentField(!showCommentField)
                }}
              ></AddCommentIcon>
            </div>
          </div>
          {showCommentField && (
            <div className='flex flex-col gap-2'>
              <TextField
                multiline
                rows={6}
                placeholder='Add your comments'
                className='bg-white w-full h-[8 0px]'
              ></TextField>
              <Button className='w-[80px] bg-purple-500 text-white p-2'>
                Comment
              </Button>
            </div>
          )}
        </div>
        <div className='flex flex-col max-h-[30%] overflow-y-auto'>
          <h1 className='text-bold text-lg border-b-[1px] mb-[2px]'>
            Comments({post.comments.length})
          </h1>
          {post.comments.map((comment, index) => {
            return (
              <div
                key={index}
                className='flex flex-col gap-2 p-2 border-b-[0.1px] radius-lg'
              >
                <div className='flex items-center gap-2'>
                  <Avatar>
                    <img
                      src='/demoimage.png'
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  </Avatar>
                  <div>
                    <div className='text-sm'>{comment.useraddress}</div>
                    <div className='text-sm'>{comment.timestamp}</div>
                  </div>
                </div>
                <p>{comment.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
