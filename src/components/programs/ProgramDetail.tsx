import { useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import type { Program } from '@/types/program'
import { programService } from '@/services/program.service'
import { taskService } from '@/services/task.service'
import { toast } from '@/utils/toast'
import './ProgramDetail.css'

interface ProgramDetailProps {
  program: Program
  onBack: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function ProgramDetail({ program, onBack, onEdit, onDelete }: ProgramDetailProps) {
  const [showRecordingModal, setShowRecordingModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const [recordingName, setRecordingName] = useState('')
  const [recordingUrl, setRecordingUrl] = useState('')
  const [recordingDay, setRecordingDay] = useState<number | undefined>(undefined)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskAssigneeId, setTaskAssigneeId] = useState<string | null>(null)
  const [taskDueDate, setTaskDueDate] = useState('')
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const [members, setMembers] = useState<Array<any>>([])
  const [inviteLink, setInviteLink] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const list = await programService.getMembers(program.organization_id)
        if (mounted) setMembers(list)
      } catch {
        // ignore
      }
    }
    load()
    return () => { mounted = false }
  }, [program.organization_id])

  async function handleSaveRecording() {
    try {
      await programService.createRecording(program.id, { name: recordingName, url: recordingUrl, day_number: recordingDay })
      toast.success('Recording saved')
      setShowRecordingModal(false)
      setRecordingName('')
      setRecordingUrl('')
      setRecordingDay(undefined)
    } catch (err: any) {
      toast.error(err?.message || 'Failed to save recording')
    }
  }

  async function handleAssignTask() {
    try {
      await taskService.create({
        title: taskTitle,
        description: taskDesc,
        assigned_to_id: taskAssigneeId,
        program_id: program.id,
        organization_id: program.organization_id,
        due_date: taskDueDate || null,
        priority: taskPriority,
        status: 'pending',
      })
      toast.success('Task assigned')
      setShowTaskModal(false)
      setTaskTitle('')
      setTaskDesc('')
      setTaskAssigneeId(null)
      setTaskDueDate('')
      setTaskPriority('medium')
    } catch (err: any) {
      toast.error(err?.message || 'Failed to assign task')
    }
  }

  async function handleCreateInvite() {
    try {
      const res = await programService.createInvite(program.id)
      const link = `${location.origin}/join?program=${program.id}&token=${res.token}`
      setInviteLink(link)
      try { await navigator.clipboard.writeText(link); toast.success('Invite link copied') } catch { toast.info('Invite link ready') }
      setShowInviteModal(true)
    } catch (err: any) {
      toast.error(err?.message || 'Failed to create invite')
    }
  }

  return (
    <div className="program-detail">
      <div className="pd-header">
        <div>
          <div className="pd-breadcrumb">Programs / <span className="muted">{program.title}</span></div>
          <h2 className="pd-title">{program.title}</h2>
        </div>
        <div className="pd-actions">
          <button className="btn-outline" onClick={onBack}>Back</button>
          <button className="btn-primary" onClick={onEdit}>Edit</button>
          <button className="btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>

      <div className="pd-main">
        {program.poster_url ? (
          <img className="pd-image" src={program.poster_url} alt={program.title} />
        ) : (
          <div className="pd-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
            <div className="muted">No image</div>
          </div>
        )}

        <div className="pd-info">
          <p className="pd-desc">{program.description}</p>

          <div className="pd-meta">
            <div className="meta-item">Duration: <strong style={{marginLeft:6}}>{program.duration || '-'}</strong></div>
            <div className="meta-item">Created: <strong style={{marginLeft:6}}>{formatDate(program.created_at)}</strong></div>
            <div className="meta-item">ID: <span className="muted" style={{marginLeft:6}}>{program.id}</span></div>
          </div>

          <div className="pd-btns">
            <button className="btn-primary" onClick={() => setShowRecordingModal(true)}>+ Recording</button>
            <button className="btn-outline" onClick={() => setShowTaskModal(true)}>Assign Task</button>
            <button className="btn-outline" onClick={handleCreateInvite}>Invite</button>
            {program.zoom_link && <a className="btn-primary" href={program.zoom_link} target="_blank" rel="noreferrer">Join Zoom</a>}
          </div>
        </div>
      </div>

      <div className="pd-sections">
        <div className="section-card">
          <h4 className="section-title">Recordings</h4>
          <div className="muted">Add recordings to the program so members can watch lessons.</div>
          <div style={{marginTop:12}}>
            {/* Placeholder list - actual list fetch not implemented here */}
            <div className="list-item"><div>Day 1 — Introduction</div><div className="muted">YouTube link</div></div>
            <div className="list-item"><div>Day 2 — Workout</div><div className="muted">Vimeo link</div></div>
          </div>
        </div>

        <div>
          <div className="section-card" style={{marginBottom: 12}}>
            <h4 className="section-title">Tasks</h4>
            <div className="muted">Create and assign tasks to program members.</div>
            <div style={{marginTop:12}}>
              <div className="list-item"><div>Welcome message</div><div className="muted">Assigned to Alice</div></div>
              <div className="list-item"><div>Complete intake form</div><div className="muted">Unassigned</div></div>
            </div>
          </div>

          <div className="section-card">
            <h4 className="section-title">Members</h4>
            <div className="muted">People in this program</div>
            <div style={{marginTop:12}}>
              {members.map((m) => (
                <div key={m.id} className="list-item"><div>{m.full_name || m.email}</div><div className="muted">{m.email}</div></div>
              ))}
              {members.length === 0 && <div className="muted">No members yet</div>}
            </div>
          </div>
        </div>
      </div>

      {showRecordingModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Add Recording</h3>
            <label>Name</label>
            <input value={recordingName} onChange={(e) => setRecordingName(e.target.value)} />
            <label>Video URL</label>
            <input value={recordingUrl} onChange={(e) => setRecordingUrl(e.target.value)} />
            <label>Day (optional)</label>
            <input type="number" value={recordingDay ?? ''} onChange={(e) => setRecordingDay(e.target.value ? parseInt(e.target.value, 10) : undefined)} />
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button className="btn-primary" onClick={handleSaveRecording}>Save</button>
              <button className="btn-outline" onClick={() => setShowRecordingModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showTaskModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Assign Task</h3>
            <label>Title</label>
            <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
            <label>Description</label>
            <textarea value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} />
            <label>Assignee</label>
            <select value={taskAssigneeId ?? ''} onChange={(e) => setTaskAssigneeId(e.target.value || null)}>
              <option value="">-- Select assignee --</option>
              {members.map((m) => (<option key={m.id} value={m.id}>{m.full_name || m.email}</option>))}
            </select>
            <label>Due Date</label>
            <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
            <label>Priority</label>
            <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value as any)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button className="btn-primary" onClick={handleAssignTask}>Assign</button>
              <button className="btn-outline" onClick={() => setShowTaskModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Invite Link</h3>
            <p>Share this link to invite a user to this program.</p>
            <input readOnly value={inviteLink || ''} />
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button className="btn-primary" onClick={() => { if (inviteLink) navigator.clipboard.writeText(inviteLink) }}>Copy Link</button>
              <button className="btn-outline" onClick={() => setShowInviteModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
