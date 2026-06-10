export interface User {
  id: string
  email: string
  fullName: string
  brandName?: string
  avatarUrl?: string
  role: 'admin' | 'coach' | 'client'
  organization_id?: string
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupCredentials {
  fullName: string
  brandName: string
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
