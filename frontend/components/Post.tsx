'use client'

import { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Post } from '@/lib/types/Types'

// Fix: Styled ExpandMore with dynamic rotation
const ExpandMore = styled((props: { expand: boolean } & IconButtonProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

export default function PostCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div className='w-[100%] flex gap-0 flex-col'>
      <Card sx={{ width: '100%', minHeight: 200, borderRadius: 0 }}>
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
          title={<h2 className='text-bold text-xl'>{post.title}</h2>}
          subheader={
            <div className='flex gap-2 items-center justify-start text-sm text-gray-500'>
              <span>{post.useraddress}</span>
              <span>|</span>
              <span>{post.timestamp.toDateString()}</span>
            </div>
          }
        />
        <CardContent>
          <Typography variant='body2'>{post.content}</Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ paddingBottom: 0 }}>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent sx={{ backgroundColor: '#fff', paddingTop: 0 }}>
          <div>
            <h2 className='text-bold text-lg'>
              Comments({post.comments.length})
            </h2>
          </div>
        </CardContent>
      </Collapse>
    </div>
  )
}
