// Auth service - will connect to Supabase
export const authService = {
  login: async (_email: string, _password: string) => {
    // TODO: Implement with Supabase
    return { user: null, error: null }
  },
  signup: async (_name: string, _email: string, _password: string) => {
    return { user: null, error: null }
  },
  logout: async () => {
    return { error: null }
  },
  resetPassword: async (_email: string) => {
    return { error: null }
  },
}
