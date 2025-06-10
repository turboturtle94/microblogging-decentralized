export interface User {
  username: string
  walletAddress: string
  bio: string
  profilePicUrl: string
}

export interface UserApi {
  user: User
  updateUser: Function
}

export interface Comment {
  useraddress: string
  timestamp: string
  content: string
  user: User
}
export interface Post {
  id: number
  timestamp: string
  title: string
  content: string
  useraddress: string
  hasUserLiked: boolean
  comments: Array<Comment>
  user: User
}
