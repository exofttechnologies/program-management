import { useState, useEffect } from 'react'
import { usePrograms } from '@/hooks/usePrograms'
import { toast } from '@/utils/toast'
import ProgramCard from '@/components/programs/ProgramCard'
import ProgramForm from '@/components/programs/ProgramForm'
import ProgramDetail from '@/components/programs/ProgramDetail'
import type { Program, CreateProgramInput, UpdateProgramInput } from '@/types/program'
import './Programs.css'

type ViewMode = 'list' | 'detail'

export default function ProgramsPage() {
  const { programs, isLoading, error, createProgram, updateProgram, deleteProgram, clearError } =
    usePrograms()

  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)

  // Handle create
  const handleCreateProgram = async (input: CreateProgramInput) => {
    console.log('handleCreateProgram called with:', input)

    try {
      const newProgram = await createProgram(input)
      toast.success('Program created successfully!')
      setIsFormOpen(false)
      setEditingProgram(null)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create program. Please check the form and try again.'
      console.error('Program creation failed:', errorMsg)
      toast.error(errorMsg)
    }
  }

  // Handle update
  const handleUpdateProgram = async (id: string, input: UpdateProgramInput) => {
    const updated = await updateProgram(id, input)
    if (updated) {
      toast.success('Program updated successfully!')
      setIsFormOpen(false)
      setEditingProgram(null)
      setViewMode('list')
    } else {
      toast.error(error || 'Failed to update program')
    }
  }

  // Handle delete
  const handleDeleteProgram = async (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      const success = await deleteProgram(id)
      if (success) {
        toast.success('Program deleted successfully!')
        if (selectedProgram?.id === id) {
          setSelectedProgram(null)
          setViewMode('list')
        }
      } else {
        toast.error(error || 'Failed to delete program')
      }
    }
  }

  // Handle select program for detail view
  const handleSelectProgram = (program: Program) => {
    setSelectedProgram(program)
    setViewMode('detail')
  }

  // Handle edit program
  const handleEditProgram = (program: Program) => {
    setEditingProgram(program)
    setIsFormOpen(true)
  }

  // Handle back from detail view
  const handleBackToList = () => {
    setViewMode('list')
    setSelectedProgram(null)
  }

  // Handle close form
  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProgram(null)
  }

  // Show error toast when error state changes
  useEffect(() => {
    if (error) {
      toast.error(error)
      clearError()
    }
  }, [error, clearError])

  if (viewMode === 'detail' && selectedProgram) {
    return (
      <ProgramDetail
        program={selectedProgram}
        onBack={handleBackToList}
        onEdit={() => handleEditProgram(selectedProgram)}
        onDelete={() => handleDeleteProgram(selectedProgram.id)}
      />
    )
  }

  return (
    <div className="programs-container">
      <div className="programs-header">
        <div>
          <h1 className="programs-title">Programs</h1>
          <p className="programs-subtitle">Manage your coaching programs</p>
        </div>
        <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Program
        </button>
      </div>

      {/* Create/Edit Form Modal */}
      {isFormOpen && (
        <div className="programs-modal-overlay" onClick={handleCloseForm}>
          <div className="programs-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="programs-modal-header">
              <h2>{editingProgram ? 'Edit Program' : 'Create New Program'}</h2>
              <button className="btn-close" onClick={handleCloseForm}>×</button>
            </div>
            <ProgramForm
              initialData={editingProgram}
              onSubmit={editingProgram ? (data) => handleUpdateProgram(editingProgram.id, data) : handleCreateProgram}
              onCancel={handleCloseForm}
              isLoading={false}
            />
          </div>
        </div>
      )}

      {/* Programs Grid */}
      <div className="programs-content">
        {isLoading ? (
          <div className="programs-loading">
            <div className="spinner"></div>
            <p>Loading programs...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="programs-empty">
            <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <h3>No programs yet</h3>
            <p>Create your first program to get started</p>
            <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
              Create Program
            </button>
          </div>
        ) : (
          <div className="programs-grid">
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onClick={() => handleSelectProgram(program)}
                onEdit={() => handleEditProgram(program)}
                onDelete={() => handleDeleteProgram(program.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
