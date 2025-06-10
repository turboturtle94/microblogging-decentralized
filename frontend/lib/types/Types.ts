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
  timestamp: string
  content: string
}
export interface Post {
  timestamp: string
  title: string
  content: string
  useraddress: string
  hasUserLiked: boolean
  comments: Array<Comment>
}
