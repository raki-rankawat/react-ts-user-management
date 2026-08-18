import { useState, useEffect } from 'react'
import UserCard from './UserCard'
import type { User } from './types'
import styles from './style.module.css'

type UserState =
  | {
      status: 'loading'
    }
  | {
      status: 'success'
      users: User[]
    }
  | {
      status: 'error'
      message: string
    }

const UserList = () => {
  const [state, setState] = useState<UserState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    const loadUsers = async (): Promise<void> => {
      try {
        const res = await fetch(`http://localhost:5000/users`, {
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`)
        }

        const users: User[] = await res.json()
        setState({ status: 'success', users })
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        if (error instanceof Error) {
          setState({ status: 'error', message: error.message })
        } else {
          setState({ status: 'error', message: 'Something went wrong!' })
        }
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

  switch (state.status) {
    case 'loading':
      return <p>Loading...</p>

    case 'error':
      return (
        <div>
          <h2>Something went wrong!</h2>
          <p>{state.message}</p>
        </div>
      )

    case 'success':
      return (
        <div className={styles.users}>
          {state.users.map(user => (
            <UserCard key={user.id} user={user} onSelect={handleSelect} />
          ))}
        </div>
      )
  }
}

export default UserList
