import UserCard from './UserCard'
import type { User } from './types'
import styles from './style.module.css'

interface UserListProps {
  users: User[]
  onSelect: (user: User) => void
}

const UserList = ({ users, onSelect }: UserListProps) => {
  if (!users.length) {
    return <p>No users found.</p>
  }

  return (
    <div className={styles.users}>
      {users.map(user => (
        <UserCard key={user.id} user={user} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default UserList
