import UserList from './UserList'
import type { User } from './types'

const Page = () => {
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

  const handleSelect = (user: User) => {
    console.log('Selected user is: ', user)
  }

  return (
    <main>
      <h1>Users</h1>

      <UserList users={users} onSelect={handleSelect} />
    </main>
  )
}

export default Page
