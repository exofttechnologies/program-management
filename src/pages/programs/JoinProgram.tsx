import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { programService } from '@/services/program.service'
import { toast } from '@/utils/toast'

export default function JoinProgram() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function accept() {
      const programId = searchParams.get('program') || ''
      const token = searchParams.get('token') || ''
      if (!programId || !token) {
        toast.error('Missing invite parameters')
        navigate('/dashboard')
        return
      }

      try {
        await programService.acceptInvite(programId, token)
        toast.success('You have been added to the program')
        navigate('/dashboard')
      } catch (err: any) {
        toast.error(err?.message || 'Failed to accept invite')
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    accept()
  }, [searchParams, navigate])

  return (
    <div style={{ padding: 24 }}>
      {loading ? <p>Joining program…</p> : <p>Redirecting…</p>}
    </div>
  )
}
