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
  walletAddress: string
  timestamp: string
  content: string
  user: User
  postId: number
  id: number
}
export interface Post {
  id: number
  timestamp: string
  content: string
  comments: Array<Comment>
  user: User
}
