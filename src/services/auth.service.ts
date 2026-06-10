import { supabase } from '../lib/supabase'

export const authService = {
  /**
   * Sign up a new user via Supabase Auth, then create
   * an organization and a profile record.
   */
  signup: async (fullName: string, brandName: string, email: string, password: string) => {
    // 1. Create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          brand_name: brandName,
        },
      },
    })

    if (authError) throw authError
    if (!authData.user) throw new Error('Signup succeeded but no user was returned.')

    const userId = authData.user.id

    // 2. Create the organization
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: brandName })
      .select('id')
      .single()

    if (orgError) throw orgError

    // 3. Create the profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        full_name: fullName,
        email,
        role: 'owner',
        organization_id: orgData.id,
      })

    if (profileError) throw profileError

    return { user: authData.user, session: authData.session }
  },

  /**
   * Sign in an existing user.
   */
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { user: data.user, session: data.session }
  },

  /**
   * Sign out the current user.
   */
  logout: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  /**
   * Send a password reset email.
   */
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  },

  /**
   * Get the current session (used on app load).
   */
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  /**
   * Fetch the profile record for a given user id.
   */
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, organizations(name)')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Subscribe to auth state changes (login, logout, token refresh).
   */
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  },
}
