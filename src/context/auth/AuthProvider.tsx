import { useState } from 'react'
import type { User } from '../../types'
import { AuthContext } from './AuthContext'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User) => setUser(user)

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
