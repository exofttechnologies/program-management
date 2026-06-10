import { supabase } from '@/lib/supabase'

function getSupabaseErrorMessage(error: any): string {
  if (!error) return 'Unknown Supabase error'
  if (typeof error === 'string') return error
  if (typeof error.message === 'string') return error.message
  return JSON.stringify(error, Object.getOwnPropertyNames(error))
}

export const taskService = {
  getAll: async (organizationId?: string) => {
    const builder = supabase.from('tasks').select('*')
    if (organizationId) builder.eq('organization_id', organizationId)
    const { data, error } = await builder
    if (error) {
      console.error('taskService.getAll error:', getSupabaseErrorMessage(error))
      throw new Error(getSupabaseErrorMessage(error))
    }
    return data || []
  },

  getById: async (id: string) => {
    const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single()
    if (error && error.code !== 'PGRST116') throw error
    return data || null
  },

  create: async (data: Record<string, any>) => {
    const { data: created, error } = await supabase.from('tasks').insert(data).select('*').single()
    if (error) {
      console.error('taskService.create error:', getSupabaseErrorMessage(error), error)
      throw new Error(getSupabaseErrorMessage(error))
    }
    return created
  },

  update: async (id: string, updates: Record<string, any>) => {
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select('*').single()
    if (error) throw error
    return data
  },
}
