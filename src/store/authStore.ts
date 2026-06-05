import { create } from 'zustand'
import type { User } from '../types/auth'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, _password: string) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      const user: User = {
        id: '1',
        email,
        fullName: 'Sarah Anderson',
        role: 'admin',
        createdAt: new Date().toISOString(),
      }
      set({ user, isAuthenticated: true, isLoading: false })
    } catch {
      set({ error: 'Invalid email or password', isLoading: false })
    }
  },

  signup: async (name: string, email: string, _password: string) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const user: User = {
        id: '1',
        email,
        fullName: name,
        role: 'admin',
        createdAt: new Date().toISOString(),
      }
      set({ user, isAuthenticated: true, isLoading: false })
    } catch {
      set({ error: 'Failed to create account', isLoading: false })
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  clearError: () => set({ error: null }),
}))
