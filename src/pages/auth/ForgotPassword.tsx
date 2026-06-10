import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const { resetPassword, isLoading, error, clearError } = useAuthStore()
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    await resetPassword(email)

    // Check if reset succeeded (no error set in store)
    const { error: resetError } = useAuthStore.getState()
    if (!resetError) {
      setIsSuccess(true)
    }
  }

  if (isSuccess) {
    return (
      <div className="auth-card">
        <div className="auth-success">
          <div className="auth-success-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2>Check your email</h2>
          <p>We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.</p>
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', maxWidth: '280px' }}>
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-card">
      <div className="auth-card-logo">
        <div className="auth-card-logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <span>CoachFlow</span>
      </div>

      <div className="auth-header">
        <h1>Forgot Password</h1>
        <p>Enter your email address and we'll send you a password reset link.</p>
      </div>

      {error && (
        <div className="auth-alert error" style={{ marginBottom: '20px' }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <div className="form-input-wrapper">
            <svg className="form-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              id="email"
              type="email"
              className={`form-input has-icon ${error ? 'error' : ''}`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                if (error) clearError()
                setEmail(e.target.value)
              }}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={isLoading} style={{ marginTop: '8px' }}>
          {isLoading ? <div className="btn-spinner" /> : 'Send Reset Link'}
        </button>
      </form>

      <div className="auth-footer" style={{ marginTop: '32px' }}>
        <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Login
        </Link>
      </div>
    </div>
  )
}
