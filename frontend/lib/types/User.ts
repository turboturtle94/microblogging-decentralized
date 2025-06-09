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
