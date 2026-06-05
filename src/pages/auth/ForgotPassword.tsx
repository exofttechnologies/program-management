import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSuccess(true)
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
              className="form-input has-icon"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
