// app/page.tsx
import FeedPage from '@/components/Feed'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')

  if (!jwt) {
    redirect('/login') // If no JWT, send to login
  }

  return <FeedPage></FeedPage>
}
