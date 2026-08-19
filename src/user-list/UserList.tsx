import UserCard from './UserCard'
import useFetch from '../hooks/useFetch'
import type { User } from './types'
import styles from './style.module.css'

const UserList = () => {
  const state = useFetch<User[]>('http://localhost:5000/users')

  const handleSelect = (user: User) => {
    console.log('Selected user is: ', user)
  }

  const handleDelete = (id: number) => {
    console.log('Deleted user id: ', id)
  }

  switch (state.status) {
    case 'loading':
      return <p>Loading...</p>

    case 'error':
      return (
        <div>
          <h2>Something went wrong!</h2>
          <p>{state.message}</p>
          <button
            onClick={() => {
              window.location.reload()
            }}
          >
            Retry
          </button>
        </div>
      )

    case 'success':
      return (
        <div className={styles.users}>
          {state.data.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onSelect={handleSelect}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )
  }
}

export default UserList
