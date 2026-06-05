import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, isLoading, error, clearError } = useAuthStore()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Custom validation error state
  const [validationError, setValidationError] = useState<string | null>(null)

  const passwordStrength = useMemo(() => {
    if (!password) return 0
    let score = 0
    if (password.length > 7) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return score
  }, [password])

  const getStrengthClass = (level: number) => {
    if (passwordStrength >= level) {
      if (passwordStrength === 1) return 'weak active'
      if (passwordStrength === 2) return 'fair active'
      if (passwordStrength === 3) return 'good active'
      if (passwordStrength >= 4) return 'strong active'
    }
    return ''
  }

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return { text: '', class: '' }
    if (passwordStrength === 1) return { text: 'Weak', class: 'weak' }
    if (passwordStrength === 2) return { text: 'Fair', class: 'fair' }
    if (passwordStrength === 3) return { text: 'Good', class: 'good' }
    return { text: 'Strong', class: 'strong' }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    
    if (!fullName || !email || !password || !confirmPassword) {
      setValidationError("Please fill in all fields")
      return
    }
    
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match")
      return
    }

    if (!acceptTerms) {
      setValidationError("Please accept the terms and conditions")
      return
    }

    if (passwordStrength < 2) {
      setValidationError("Please choose a stronger password")
      return
    }
    
    await signup(fullName, email, password)
    // ProtectedRoute will redirect after auth state changes
    navigate('/dashboard')
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) clearError()
    if (validationError) setValidationError(null)
    setter(e.target.value)
  }

  const displayError = error || validationError

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
        <h1>Create an account</h1>
        <p>Start managing your coaching business today.</p>
      </div>

      {displayError && (
        <div className="auth-alert error" style={{ marginBottom: '20px' }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>{displayError}</span>
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">Full Name</label>
          <div className="form-input-wrapper">
            <svg className="form-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              id="fullName"
              type="text"
              className={`form-input has-icon ${displayError ? 'error' : ''}`}
              placeholder="Sarah Anderson"
              value={fullName}
              onChange={handleInputChange(setFullName)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <div className="form-input-wrapper">
            <svg className="form-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              id="email"
              type="email"
              className={`form-input has-icon ${displayError ? 'error' : ''}`}
              placeholder="you@example.com"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="form-input-wrapper">
            <svg className="form-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={`form-input has-icon ${displayError ? 'error' : ''}`}
              placeholder="Create a password"
              value={password}
              onChange={handleInputChange(setPassword)}
              required
              style={{ paddingRight: '48px' }}
            />
            <button
              type="button"
              className="form-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
          {password.length > 0 && (
            <div>
              <div className="password-strength">
                <div className={`password-strength-bar ${getStrengthClass(1)}`} />
                <div className={`password-strength-bar ${getStrengthClass(2)}`} />
                <div className={`password-strength-bar ${getStrengthClass(3)}`} />
                <div className={`password-strength-bar ${getStrengthClass(4)}`} />
              </div>
              <div className="form-row" style={{ marginTop: '4px' }}>
                <span className={`password-strength-label ${getStrengthLabel().class}`}>
                  {getStrengthLabel().text}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
          <div className="form-input-wrapper">
            <svg className="form-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              className={`form-input has-icon ${displayError ? 'error' : ''}`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
              required
            />
          </div>
        </div>

        <div className="form-row" style={{ marginTop: '8px' }}>
          <label className="form-checkbox-label">
            <input 
              type="checkbox" 
              className="form-checkbox"
              checked={acceptTerms}
              onChange={(e) => {
                if (validationError) setValidationError(null)
                setAcceptTerms(e.target.checked)
              }}
            />
            I agree to the <a href="#" className="form-link" style={{ marginLeft: '4px' }}>Terms & Conditions</a>
          </label>
        </div>

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? <div className="btn-spinner" /> : 'Create Account'}
        </button>

        <button type="button" className="btn-social">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </form>

      <div className="auth-footer">
        Already have an account? <Link to="/login">Log in here</Link>
      </div>
    </div>
  )
}
