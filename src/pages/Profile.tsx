import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const { user, login, logout } = useAuth()

  if (!user) {
    return (
      <button
        onClick={() =>
          login({
            id: 1,
            name: 'Rakesh',
            email: 'rakesh@gmail.com',
            role: 'user',
          })
        }
      >
        Login
      </button>
    )
  }

  return (
    <div>
      <h1>Welcom, {user.name}</h1>

      <p>{user.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile
