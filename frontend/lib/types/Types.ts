export interface User {
  username: string
  address: string
  bio: string
  profilePicUrl: string
}

export interface UserApi {
  user: User
  updateUser: Function
}

export interface Comment {
  useraddress: string
  timestamp: Date
  content: string
}
export interface Post {
  timestamp: Date
  title: string
  content: string
  useraddress: string
  hasUserLiked: boolean
  comments: Array<Comment>
}
