import { useState, useCallback, useEffect } from 'react'
import { programService } from '@/services/program.service'
import { authService } from '@/services/auth.service'
import type { Program, CreateProgramInput, UpdateProgramInput } from '@/types/program'
import { useAuthStore } from '@/store/authStore'

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuthStore()

  const organizationId = user?.organization_id || ''

  // Debug: Log when organization_id changes
  useEffect(() => {
    console.log('usePrograms - user:', user)
    console.log('usePrograms - organizationId:', organizationId)
  }, [user, organizationId])

  const resolveOrganizationId = useCallback(async (): Promise<string> => {
    if (organizationId) return organizationId
    if (!user?.id) return ''

    try {
      const profile = await authService.getProfile(user.id)
      if (profile?.organization_id) {
        console.log('Resolved organization_id from profile:', profile.organization_id)
        return profile.organization_id
      }
    } catch (err) {
      console.error('Unable to resolve organization_id from profile:', err)
    }

    return ''
  }, [organizationId, user])

  /**
   * Fetch all programs
   */
  const fetchPrograms = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const resolvedOrganizationId = await resolveOrganizationId()
      if (!resolvedOrganizationId) {
        throw new Error('No organization found for current user.')
      }

      const data = await programService.getAll(resolvedOrganizationId)
      setPrograms(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch programs'
      setError(message)
      console.error('Error fetching programs:', err)
    } finally {
      setIsLoading(false)
    }
  }, [resolveOrganizationId])

  /**
   * Fetch a single program by ID
   */
  const fetchProgram = useCallback(async (id: string): Promise<Program | null> => {
    try {
      const data = await programService.getById(id)
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch program'
      setError(message)
      console.error('Error fetching program:', err)
      return null
    }
  }, [])

  /**
   * Create a new program
   */
  const createProgram = useCallback(
    async (input: CreateProgramInput): Promise<Program> => {
      setError(null)

      try {
        const resolvedOrganizationId = await resolveOrganizationId()
        if (!resolvedOrganizationId) {
          const msg = 'No organization found. Please ensure you are logged in.'
          setError(msg)
          console.error('createProgram error:', msg, { user, organizationId })
          throw new Error(msg)
        }

        console.log('createProgram - input:', input, 'organizationId:', resolvedOrganizationId)
        const newProgram = await programService.create(resolvedOrganizationId, input)
        setPrograms((prev) => [newProgram, ...prev])
        return newProgram
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create program'
        setError(message)
        console.error('Error creating program:', err, 'message:', message)
        throw new Error(message)
      }
    },
    [organizationId, resolveOrganizationId, user]
  )

  /**
   * Update an existing program
   */
  const updateProgram = useCallback(
    async (id: string, input: UpdateProgramInput): Promise<Program | null> => {
      setError(null)

      try {
        const updated = await programService.update(id, input)
        setPrograms((prev) => prev.map((p) => (p.id === id ? updated : p)))
        return updated
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update program'
        setError(message)
        console.error('Error updating program:', err)
        return null
      }
    },
    []
  )

  /**
   * Delete a program
   */
  const deleteProgram = useCallback(async (id: string): Promise<boolean> => {
    setError(null)

    try {
      await programService.delete(id)
      setPrograms((prev) => prev.filter((p) => p.id !== id))
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete program'
      setError(message)
      console.error('Error deleting program:', err)
      return false
    }
  }, [])

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Fetch programs on mount and when user/auth state changes
  useEffect(() => {
    const loadPrograms = async () => {
      if (!user) return
      await fetchPrograms()
    }

    loadPrograms()
  }, [user, fetchPrograms])

  return {
    programs,
    isLoading,
    error,
    fetchPrograms,
    fetchProgram,
    createProgram,
    updateProgram,
    deleteProgram,
    clearError,
  }
}
