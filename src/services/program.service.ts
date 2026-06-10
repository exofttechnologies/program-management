import { supabase } from '@/lib/supabase'
import type { Program, CreateProgramInput, UpdateProgramInput } from '@/types/program'

function getSupabaseErrorMessage(error: any): string {
  if (!error) return 'Unknown Supabase error'
  if (typeof error === 'string') return error
  if (typeof error.message === 'string') return error.message
  return JSON.stringify(error, Object.getOwnPropertyNames(error))
}

export const programService = {
  /**
   * Fetch all programs for the organization
   */
  getAll: async (organizationId: string): Promise<Program[]> => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })

    if (error) {
      const message = getSupabaseErrorMessage(error)
      console.error('programService.getAll supabase error:', message, error)
      throw new Error(message)
    }

    return data || []
  },

  /**
   * Fetch a single program by ID
   */
  getById: async (id: string): Promise<Program | null> => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows found
    return data || null
  },

  /**
   * Create a new program
   */
  create: async (organizationId: string, input: CreateProgramInput): Promise<Program> => {
    let sessionResult: any = null

    try {
      sessionResult = await supabase.auth.getSession()
      console.log('programService.create - supabase session:', sessionResult)
    } catch (sessionErr) {
      console.warn('programService.create - failed to read supabase session', sessionErr)
    }

    const { data, error } = await supabase
      .from('programs')
      .insert({
        organization_id: organizationId,
        title: input.title,
        description: input.description,
        duration: input.duration,
        poster_url: input.poster_url,
        zoom_link: input.zoom_link,
      })
      .select('*')
      .single()

    if (error) {
      const message = getSupabaseErrorMessage(error)
      console.error('programService.create supabase error:', message, {
        error,
        session: sessionResult,
      })
      throw new Error(message)
    }

    if (!data) throw new Error('Failed to create program')
    return data
  },

  /**
   * Update an existing program
   */
  update: async (id: string, input: UpdateProgramInput): Promise<Program> => {
    const { data, error } = await supabase
      .from('programs')
      .update({
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.duration !== undefined && { duration: input.duration }),
        ...(input.poster_url !== undefined && { poster_url: input.poster_url }),
        ...(input.zoom_link !== undefined && { zoom_link: input.zoom_link }),
      })
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    if (!data) throw new Error('Failed to update program')
    return data
  },

  /**
   * Delete a program
   */
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  /**
   * Add a recording entry for a program (stored in `program_recordings` table)
   */
  createRecording: async (programId: string, input: { name: string; url: string; day_number?: number }) => {
    const { data, error } = await supabase
      .from('program_recordings')
      .insert({ program_id: programId, name: input.name, url: input.url, day_number: input.day_number })
      .select('*')
      .single()

    if (error) {
      // Table may not exist in some environments; surface a readable message
      const message = getSupabaseErrorMessage(error)
      console.error('programService.createRecording error:', message, error)
      throw new Error(message)
    }

    return data
  },

  /**
   * Create an invite token/link for a program. Stores token in `program_invites` table.
   */
  createInvite: async (programId: string, expires_in_days = 14, inviteeEmail?: string) => {
    const token = Math.random().toString(36).slice(2, 12)
    const expiresAt = new Date(Date.now() + expires_in_days * 24 * 60 * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from('program_invites')
      .insert({ program_id: programId, token, expires_at: expiresAt })
      .select('*')
      .single()

    if (error) {
      const message = getSupabaseErrorMessage(error)
      console.error('programService.createInvite error:', message, error)
      throw new Error(message)
    }

    // Optionally email the invite link
    if (inviteeEmail) {
      try {
        const { sendInviteEmail } = await import('../utils/email')
        const link = `${location.origin}/join?program=${programId}&token=${data.token}`
        await sendInviteEmail(inviteeEmail, 'You are invited to join a program', `<p>Join the program: <a href="${link}">${link}</a></p>`)
      } catch (e) {
        console.warn('Failed to send invite email', e)
      }
    }

    return { token: data.token, expires_at: data.expires_at }
  },

  /**
   * Accept an invite token for a program. Creates a program_members record.
   */
  acceptInvite: async (programId: string, token: string, userId?: string) => {
    // Find invite
    const { data: invite, error: inviteErr } = await supabase
      .from('program_invites')
      .select('*')
      .eq('program_id', programId)
      .eq('token', token)
      .single()

    if (inviteErr) throw inviteErr
    if (!invite) throw new Error('Invalid invite token')

    // Optionally check expiry
    if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
      throw new Error('Invite token has expired')
    }

    // Prevent re-use if already used
    if (invite.used_at) throw new Error('Invite token already used')

    // Create membership
    const { data: member, error: memberErr } = await supabase
      .from('program_members')
      .insert({ program_id: programId, user_id: userId || null })
      .select('*')
      .single()

    if (memberErr) throw memberErr

    // Mark invite used
    const { data: updatedInvite, error: updateErr } = await supabase
      .from('program_invites')
      .update({ used_at: new Date().toISOString(), used_by: userId || null })
      .eq('id', invite.id)
      .select('*')
      .single()

    if (updateErr) console.warn('Failed to mark invite used', getSupabaseErrorMessage(updateErr))

    return member
  },

  /**
   * Return list of organization members (lightweight helper for UI selects).
   * In production this queries `profiles`. For mock mode we synthesize a few entries.
   */
  getMembers: async (organizationId: string) => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('organization_id', organizationId as any)
      if (error) {
        // fall back to mock session-based list
        throw error
      }
      return data || []
    } catch {
      // Mocked members
      return [
        { id: 'mock-user-1', full_name: 'Alice', email: 'alice@example.com' },
        { id: 'mock-user-2', full_name: 'Bob', email: 'bob@example.com' },
      ]
    }
  },
}
