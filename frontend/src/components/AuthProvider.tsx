import { createContext, ReactNode, useState } from 'react'

export interface AuthContextType {
  token: string | null
  handleLogin: (token: string) => void
  handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)

  function handleLogin(token: string) {
    setToken(token)
  }

  function handleLogout() {
    setToken(null)
  }

  const value = {
    token,
    handleLogin,
    handleLogout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
