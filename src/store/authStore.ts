import { create } from 'zustand'
import type { User } from '../types/auth'
import { authService } from '../services/auth.service'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitializing: boolean
  error: string | null
  successMessage: string | null

  initialize: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, brandName: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  clearError: () => void
  clearSuccess: () => void
}

/**
 * Map a Supabase profile row into our app-level User type.
 */
function mapProfileToUser(profile: any): User {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    brandName: profile.organizations?.name ?? undefined,
    role: profile.role === 'owner' ? 'admin' : profile.role,
    organization_id: profile.organization_id ?? undefined,
    createdAt: profile.created_at ?? new Date().toISOString(),
  }
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,
  successMessage: null,

  /**
   * Called once on app mount to check for an existing session.
   */
  initialize: async () => {
    try {
      const session = await authService.getSession()

      if (session?.user) {
        try {
          const profile = await authService.getProfile(session.user.id)
          set({
            user: mapProfileToUser(profile),
            isAuthenticated: true,
            isInitializing: false,
          })
        } catch {
          // Profile doesn't exist yet (edge case), use basic session info
          set({
            user: {
              id: session.user.id,
              email: session.user.email ?? '',
              fullName: session.user.user_metadata?.full_name ?? '',
              role: 'admin',
              createdAt: session.user.created_at ?? new Date().toISOString(),
            },
            isAuthenticated: true,
            isInitializing: false,
          })
        }
      } else {
        set({ isInitializing: false })
      }
    } catch {
      set({ isInitializing: false })
    }

    // Subscribe to future auth changes (token refresh, sign-out from another tab, etc.)
    authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        set({ user: null, isAuthenticated: false })
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Only update if we don't already have user state (prevents double-set on login)
        if (!get().isAuthenticated && session?.user) {
          try {
            const profile = await authService.getProfile(session.user.id)
            set({
              user: mapProfileToUser(profile),
              isAuthenticated: true,
            })
          } catch {
            set({
              user: {
                id: session.user.id,
                email: session.user.email ?? '',
                fullName: session.user.user_metadata?.full_name ?? '',
                role: 'admin',
                createdAt: session.user.created_at ?? new Date().toISOString(),
              },
              isAuthenticated: true,
            })
          }
        }
      }
    })
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null, successMessage: null })
    try {
      const { user: authUser } = await authService.login(email, password)

      if (!authUser) throw new Error('Login failed. Please try again.')

      try {
        const profile = await authService.getProfile(authUser.id)
        set({
          user: mapProfileToUser(profile),
          isAuthenticated: true,
          isLoading: false,
        })
      } catch {
        // Fallback if profile fetch fails
        set({
          user: {
            id: authUser.id,
            email: authUser.email ?? '',
            fullName: authUser.user_metadata?.full_name ?? '',
            role: 'admin',
            createdAt: authUser.created_at ?? new Date().toISOString(),
          },
          isAuthenticated: true,
          isLoading: false,
        })
      }
    } catch (err: any) {
      const message = err?.message || 'Invalid email or password'
      set({ error: message, isLoading: false })
    }
  },

  signup: async (name: string, brandName: string, email: string, password: string) => {
    set({ isLoading: true, error: null, successMessage: null })
    try {
      const { user: authUser } = await authService.signup(name, brandName, email, password)

      if (!authUser) throw new Error('Signup failed. Please try again.')

      // Fetch the profile to get organization_id
      try {
        const profile = await authService.getProfile(authUser.id)
        set({
          user: mapProfileToUser(profile),
          isAuthenticated: true,
          isLoading: false,
          successMessage: 'Workspace created successfully',
        })
      } catch {
        // Fallback if profile fetch fails
        set({
          user: {
            id: authUser.id,
            email: authUser.email ?? email,
            fullName: name,
            brandName,
            role: 'admin',
            createdAt: authUser.created_at ?? new Date().toISOString(),
          },
          isAuthenticated: true,
          isLoading: false,
          successMessage: 'Workspace created successfully',
        })
      }
    } catch (err: any) {
      const message = err?.message || 'Failed to create account'
      set({ error: message, isLoading: false })
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      await authService.logout()
    } catch {
      // Sign out locally even if remote fails
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        successMessage: null,
      })
    }
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null, successMessage: null })
    try {
      await authService.resetPassword(email)
      set({
        isLoading: false,
        successMessage: 'Password reset link sent to your email.',
      })
    } catch (err: any) {
      const message = err?.message || 'Failed to send reset email'
      set({ error: message, isLoading: false })
    }
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ successMessage: null }),
}))
