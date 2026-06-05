export interface User {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  role: 'admin' | 'coach' | 'client'
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupCredentials {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
