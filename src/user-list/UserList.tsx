import UserCard from './UserCard'
import type { User } from './types'
import styles from './style.module.css'

const users: User[] = [
  {
    id: 1,
    name: 'Rakesh',
    email: 'rakesh@example.com',
    role: 'admin',
  },
  {
    id: 2,
    name: 'John',
    email: 'john@example.com',
    role: 'user',
  },
  {
    id: 3,
    name: 'Sarah',
    email: 'sarah@example.com',
    role: 'user',
  },
]

const UserList = () => {
  const handleSelect = (user: User) => {
    console.log('Selected user is: ', user)
  }

  if (!users.length) {
    return <p>No users found.</p>
  }

  return (
    <div className={styles.users}>
      {users.map(user => (
        <UserCard key={user.id} user={user} onSelect={handleSelect} />
      ))}
    </div>
  )
}

export default UserList
