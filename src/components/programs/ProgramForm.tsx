import { useState, useEffect } from 'react'
import type { Program, CreateProgramInput, UpdateProgramInput } from '@/types/program'

interface ProgramFormProps {
  initialData?: Program | null
  onSubmit: (data: CreateProgramInput | UpdateProgramInput) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export default function ProgramForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProgramFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    poster_url: '',
    zoom_link: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        duration: initialData.duration,
        poster_url: initialData.poster_url || '',
        zoom_link: initialData.zoom_link || '',
      })
    }
  }, [initialData])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required'
    }

    if (formData.zoom_link && !isValidUrl(formData.zoom_link)) {
      newErrors.zoom_link = 'Please enter a valid URL'
    }

    if (formData.poster_url && !isValidUrl(formData.poster_url)) {
      newErrors.poster_url = 'Please enter a valid image URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      console.log('Form validation failed', errors)
      return
    }

    setIsSubmitting(true)
    try {
      console.log('Submitting form with data:', formData)
      await onSubmit(formData)
    } catch (err) {
      console.error('Form submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="program-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Program Title *
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Mind Transformation"
          className={`form-input ${errors.title ? 'error' : ''}`}
          disabled={isSubmitting || isLoading}
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your program..."
          rows={4}
          className={`form-input ${errors.description ? 'error' : ''}`}
          disabled={isSubmitting || isLoading}
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="duration" className="form-label">
          Duration *
        </label>
        <input
          id="duration"
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="e.g., 12 weeks"
          className={`form-input ${errors.duration ? 'error' : ''}`}
          disabled={isSubmitting || isLoading}
        />
        {errors.duration && <span className="form-error">{errors.duration}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="poster_url" className="form-label">
          Poster Image URL
        </label>
        <input
          id="poster_url"
          type="url"
          name="poster_url"
          value={formData.poster_url}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className={`form-input ${errors.poster_url ? 'error' : ''}`}
          disabled={isSubmitting || isLoading}
        />
        {errors.poster_url && <span className="form-error">{errors.poster_url}</span>}
        {formData.poster_url && (
          <img src={formData.poster_url} alt="Preview" className="form-image-preview" onError={(e) => {
            e.currentTarget.style.display = 'none'
          }} />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="zoom_link" className="form-label">
          Zoom Meeting Link
        </label>
        <input
          id="zoom_link"
          type="url"
          name="zoom_link"
          value={formData.zoom_link}
          onChange={handleChange}
          placeholder="https://zoom.us/j/..."
          className={`form-input ${errors.zoom_link ? 'error' : ''}`}
          disabled={isSubmitting || isLoading}
        />
        {errors.zoom_link && <span className="form-error">{errors.zoom_link}</span>}
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isSubmitting || isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? (
            <>
              <span className="spinner-sm"></span>
              {initialData ? 'Updating...' : 'Creating...'}
            </>
          ) : initialData ? (
            'Update Program'
          ) : (
            'Create Program'
          )}
        </button>
      </div>
    </form>
  )
}
