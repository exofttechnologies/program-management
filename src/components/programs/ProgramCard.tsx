import { formatDate } from '@/utils/formatDate'
import type { Program } from '@/types/program'

interface ProgramCardProps {
  program: Program
  onClick: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function ProgramCard({ program, onClick, onEdit, onDelete }: ProgramCardProps) {
  return (
    <div className="program-card" onClick={onClick}>
      <div className="program-card-image">
        {program.poster_url ? (
          <img src={program.poster_url} alt={program.title} />
        ) : (
          <div className="program-card-placeholder">
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        )}
      </div>

      <div className="program-card-body">
        <h3 className="program-card-title">{program.title}</h3>
        <p className="program-card-description">{program.description}</p>

        <div className="program-card-meta">
          <span className="program-card-duration">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {program.duration}
          </span>
          <span className="program-card-date">{formatDate(program.created_at)}</span>
        </div>

        {program.zoom_link && (
          <a href={program.zoom_link} target="_blank" rel="noopener noreferrer" className="program-card-zoom">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 21.96c-5.49 0-9.96-4.47-9.96-9.96s4.47-9.96 9.96-9.96 9.96 4.47 9.96 9.96-4.47 9.96-9.96 9.96z" />
              <path d="M10.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3a1.5 1.5 0 011.5-1.5z" />
            </svg>
            Join Zoom
          </a>
        )}
      </div>

      <div className="program-card-actions" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-icon"
          onClick={onEdit}
          title="Edit program"
          aria-label="Edit program"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          className="btn-icon btn-icon-danger"
          onClick={onDelete}
          title="Delete program"
          aria-label="Delete program"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
