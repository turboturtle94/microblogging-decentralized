'use client'

import { User } from '@/lib/types/Types'

export default function ProfileView(props: { user: User }) {
  const { username, bio, profilePicUrl } = props.user

  return (
    <div className='grid grid-rows-[1fr_2fr] bg-purple-50 w-full h-auto rounded-lg overflow-hidden shadow-md'>
      <div className='w-full p-6'>
        <h2 className='text-4xl md:text-6xl font-bold mb-4 text-center text-gray-600'>
          {username}
        </h2>
        <p className='text-base md:text-lg text-center text-gray-600'>{bio}</p>
      </div>
      <div className='w-full h-72 sm:h-96 relative overflow-hidden'>
        {profilePicUrl ? (
          <img
            src={profilePicUrl}
            alt='Profile'
            className='w-full h-full object-cover object-top'
          />
        ) : (
          <div className='flex items-center justify-center w-full h-full border border-dashed border-gray-300 bg-gray-100 text-gray-500 text-center px-4 text-base sm:text-lg'>
            Come on! Don&apos;t let those looks go wasted! <br /> Update your
            profile and shine!
          </div>
        )}
      </div>
    </div>
  )
}

