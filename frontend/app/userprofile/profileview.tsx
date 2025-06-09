'use client'

import { User } from '@/lib/types/Types'

export default function ProfileView(props: { user: User }) {
  const { username, bio, profilePicUrl, address } = props.user as User
  return (
    <>
      <div className='grid grid-rows-[1fr_2fr] bg-purple-50 w-[80%] h-[80%] rounded-lg'>
        <div className='w-full h-full relative rounded-lg'>
          <section className='p-8 rounded-lg'>
            <h2 className='text-6xl font-bold mb-4 flex justify-center items-center text-gray-600'>
              Edward Newgate
            </h2>
            <p className='text-lg  mb-4 text-gray-600'>
              Writing code by day, singing in the shower by night. Occasionally
              seen turning bugs into features and coffee into art. Software dev
              with a side hustle in high notes and brush strokes. I break loops
              and paint moods — sometimes in the same hour. Ctrl + Z is my love
              language.
            </p>
          </section>
        </div>
        <div className='w-full h-full relative rounded-b-lg  overflow-hidden'>
          <img
            src='/demoimage.png'
            className='w-full h-full object-cover object-top'
          ></img>
        </div>
      </div>
    </>
  )
}
