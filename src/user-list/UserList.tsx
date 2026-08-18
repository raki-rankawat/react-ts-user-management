import { useState, useEffect } from 'react'
import UserCard from './UserCard'
import type { User } from './types'
import styles from './style.module.css'

const UserList = () => {
  const [users, setUsers] = useState<User[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadUsers = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`http://localhost:5000/users`, {
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`)
        }

        const data: User[] = await res.json()
        setUsers(data)
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Something went wrong!')
        }
      } finally {
        setLoading(false)
      }
    }

    loadUsers()

    return () => {
      controller.abort()
    }
  }, [])

  const handleSelect = (user: User) => {
    console.log('Selected user is: ', user)
  }

  if (loading) {
    return <p>Loading users...</p>
  }

  if (!users?.length) {
    return <p>No users found.</p>
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>

        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  return (
    <div className={styles.users}>
      {users?.map(user => (
        <UserCard key={user.id} user={user} onSelect={handleSelect} />
      ))}
    </div>
  )
}

export default UserList
