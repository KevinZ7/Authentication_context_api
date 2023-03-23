export interface userListProps {
  users: user[] | undefined
}

export interface user {
  username: string,
  email: string,
  profile_icon: string
}