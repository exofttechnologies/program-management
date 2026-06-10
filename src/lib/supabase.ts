import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const isConfigured =
  supabaseUrl &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseAnonKey &&
  !supabaseAnonKey.includes('your_supabase')

let supabaseClient: any

// In-memory mock DBs for dev / offline mode
const mockProgramsDb: Record<string, any[]> = {}
const mockTasksDb: Record<string, any[]> = {}
const mockProgramInvitesDb: Record<string, any[]> = {}
const mockProgramRecordingsDb: Record<string, any[]> = {}
const mockProgramMembersDb: Record<string, any[]> = {}

function createMockSupabase() {
  const mockAuth = {
    getSession: async () => {
      const stored = localStorage.getItem('mock_supabase_session')
      if (stored) {
        try { return { data: { session: JSON.parse(stored) }, error: null } } catch { }
      }
      return { data: { session: null }, error: null }
    },
    onAuthStateChange: (cb: (event: string, session: any) => void) => {
      const stored = localStorage.getItem('mock_supabase_session')
      let session = null
      if (stored) { try { session = JSON.parse(stored) } catch {} }
      setTimeout(() => cb(session ? 'SIGNED_IN' : 'SIGNED_OUT', session), 0)
      return { data: { subscription: { unsubscribe() {} } } }
    },
    signUp: async ({ email, password, options }: any) => {
      const user = { id: 'mock-user-' + Math.random().toString(36).slice(2,10), email, user_metadata: { full_name: options?.data?.full_name || 'User', brand_name: options?.data?.brand_name || 'Org' }, created_at: new Date().toISOString() }
      const session = { user, access_token: 'mock-token', refresh_token: 'mock-refresh', expires_at: Math.floor(Date.now()/1000)+3600 }
      localStorage.setItem('mock_supabase_session', JSON.stringify(session))
      return { data: { user, session }, error: null }
    },
    signInWithPassword: async ({ email }: any) => {
      const user = { id: 'mock-user-default', email, user_metadata: { full_name: email.split('@')[0], brand_name: 'Org' }, created_at: new Date().toISOString() }
      const session = { user, access_token: 'mock-token', refresh_token: 'mock-refresh', expires_at: Math.floor(Date.now()/1000)+3600 }
      localStorage.setItem('mock_supabase_session', JSON.stringify(session))
      return { data: { user, session }, error: null }
    },
    signOut: async () => { localStorage.removeItem('mock_supabase_session'); return { error: null } },
    resetPasswordForEmail: async () => ({ error: null }),
  }

  function mockFrom(table: string) {
    let data: any = null
    let whereConditions: any = {}
    let lastOp: 'insert' | 'update' | 'delete' | null = null

    const builder: any = {
      insert(inputData: any) { lastOp = 'insert'; data = Array.isArray(inputData) ? inputData : inputData; return builder },
      update(inputData: any) { lastOp = 'update'; data = inputData; return builder },
      delete() { lastOp = 'delete'; data = null; return builder },
      select(_fields?: string) { return builder },
      eq(column: string, value: any) { whereConditions[column] = value; return builder },
      order() { return builder },
      then(resolve: any) { resolve({ data: null, error: null }) },
      async single() {
        // create
        if (data) {
          if (table === 'programs') {
            const orgId = data.organization_id || whereConditions.organization_id || 'mock-org'
            if (!mockProgramsDb[orgId]) mockProgramsDb[orgId] = []
            const newProgram = { id: 'prog-' + Math.random().toString(36).slice(2,10), organization_id: orgId, ...data, created_at: new Date().toISOString() }
            mockProgramsDb[orgId].push(newProgram)
            return { data: newProgram, error: null }
          }
          if (table === 'tasks') {
            const orgId = data.organization_id || 'mock-org'
            if (!mockTasksDb[orgId]) mockTasksDb[orgId] = []
            const newTask = { id: 'task-' + Math.random().toString(36).slice(2,10), ...data }
            mockTasksDb[orgId].push(newTask)
            return { data: newTask, error: null }
          }
          if (table === 'program_recordings') {
            const prog = data.program_id || whereConditions.program_id || 'prog-mock'
            if (!mockProgramRecordingsDb[prog]) mockProgramRecordingsDb[prog] = []
            const newRec = { id: 'rec-' + Math.random().toString(36).slice(2,10), ...data, created_at: new Date().toISOString() }
            mockProgramRecordingsDb[prog].push(newRec)
            return { data: newRec, error: null }
          }
          if (table === 'program_invites') {
            const prog = data.program_id || whereConditions.program_id || 'prog-mock'
            if (!mockProgramInvitesDb[prog]) mockProgramInvitesDb[prog] = []
            if (lastOp === 'update') {
              // find by id or token
              const id = whereConditions.id
              const token = whereConditions.token || data.token
              let found = null
              if (id) {
                for (const k of Object.keys(mockProgramInvitesDb)) { const f = mockProgramInvitesDb[k].find((p:any)=>p.id===id); if (f) { found = f; break } }
              } else if (token) {
                for (const k of Object.keys(mockProgramInvitesDb)) { const f = mockProgramInvitesDb[k].find((p:any)=>p.token===token); if (f) { found = f; break } }
              }
              if (found) {
                Object.assign(found, data)
                return { data: found, error: null }
              }
            }
            const newInvite = { id: 'inv-' + Math.random().toString(36).slice(2,10), token: data.token || Math.random().toString(36).slice(2,10), expires_at: data.expires_at || null, program_id: prog }
            mockProgramInvitesDb[prog].push(newInvite)
            return { data: newInvite, error: null }
          }
          if (table === 'program_members') {
            const prog = data.program_id || whereConditions.program_id || 'prog-mock'
            if (!mockProgramMembersDb[prog]) mockProgramMembersDb[prog] = []
            const newMember = { id: 'pm-' + Math.random().toString(36).slice(2,10), ...data, joined_at: new Date().toISOString() }
            mockProgramMembersDb[prog].push(newMember)
            return { data: newMember, error: null }
          }
        }

        // selects / single
        if (table === 'profiles') {
          const stored = localStorage.getItem('mock_supabase_session')
          let session = null
          if (stored) { try { session = JSON.parse(stored) } catch {} }
          const fullName = session?.user?.user_metadata?.full_name || 'Muhammed'
          const brand = session?.user?.user_metadata?.brand_name || 'CoachFlow'
          const email = session?.user?.email || 'muhammed@example.com'
          const id = session?.user?.id || 'mock-user-id'
          return { data: { id, full_name: fullName, email, role: 'owner', organization_id: 'mock-org-' + id.substring(0,8), created_at: new Date().toISOString(), organizations: { name: brand } }, error: null }
        }
        if (table === 'programs') {
          if (whereConditions.id) {
            for (const k of Object.keys(mockProgramsDb)) { const f = mockProgramsDb[k].find((p:any)=>p.id===whereConditions.id); if (f) return { data: f, error: null } }
            return { data: null, error: null }
          }
          if (whereConditions.organization_id) return { data: mockProgramsDb[whereConditions.organization_id] || [], error: null }
          return { data: [], error: null }
        }
        if (table === 'tasks') {
          if (whereConditions.id) { for (const k of Object.keys(mockTasksDb)) { const t = mockTasksDb[k].find((x:any)=>x.id===whereConditions.id); if (t) return { data: t, error: null } } return { data: null, error: null } }
          if (whereConditions.organization_id) return { data: mockTasksDb[whereConditions.organization_id] || [], error: null }
          return { data: [], error: null }
        }
        if (table === 'program_recordings') { const prog = whereConditions.program_id; return { data: mockProgramRecordingsDb[prog] || [], error: null } }
        if (table === 'program_members') { const prog = whereConditions.program_id; return { data: mockProgramMembersDb[prog] || [], error: null } }
        if (table === 'program_invites') { const prog = whereConditions.program_id; const token = whereConditions.token; const invites = mockProgramInvitesDb[prog] || []; const found = invites.find((i:any)=>i.token===token); return { data: found || null, error: null } }

        return { data: null, error: null }
      }
    }

    // async builder for awaited queries
    const asyncBuilder: any = {
      ...builder,
      async insert(inputData: any) { data = Array.isArray(inputData) ? inputData : inputData; return asyncBuilder },
      async select() {
        if (table === 'programs') { if (whereConditions.organization_id) return { data: mockProgramsDb[whereConditions.organization_id] || [], error: null }; return { data: [], error: null } }
        if (table === 'tasks') { if (whereConditions.organization_id) return { data: mockTasksDb[whereConditions.organization_id] || [], error: null }; return { data: [], error: null } }
        if (table === 'program_recordings') { const prog = whereConditions.program_id; return { data: mockProgramRecordingsDb[prog] || [], error: null } }
        if (table === 'program_invites') { const prog = whereConditions.program_id; return { data: mockProgramInvitesDb[prog] || [], error: null } }
        if (table === 'program_members') { const prog = whereConditions.program_id; return { data: mockProgramMembersDb[prog] || [], error: null } }
        return { data: null, error: null }
      },
      async single() { return builder.single() },
    }

    return asyncBuilder
  }

  return { auth: mockAuth, from: mockFrom }
}

if (isConfigured) {
  try { supabaseClient = createClient(supabaseUrl, supabaseAnonKey) } catch (e) { console.warn('Failed to init Supabase client, using mock', e); supabaseClient = createMockSupabase() }
} else {
  supabaseClient = createMockSupabase()
}

export const supabase = supabaseClient
