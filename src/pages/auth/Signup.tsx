import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, isLoading, error, clearError } = useAuthStore()

  const [fullName, setFullName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [receiveUpdates, setReceiveUpdates] = useState(false)
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
    
    if (!fullName || !brandName || !email || !password || !confirmPassword) {
      setValidationError("Please fill in all fields")
      return
    }
    
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match")
      return
    }

    if (passwordStrength < 2) {
      setValidationError("Please choose a stronger password")
      return
    }
    
    await signup(fullName, brandName, email, password)

    // Only navigate if signup succeeded (no error set)
    const { error: signupError, isAuthenticated } = useAuthStore.getState()
    if (!signupError && isAuthenticated) {
      navigate('/dashboard')
    }
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) clearError()
    if (validationError) setValidationError(null)
    setter(e.target.value)
  }

  const displayError = error || validationError

  return (
    <div className="auth-card">
      <div className="auth-register-title">Register or login</div>
      <div className="auth-register-desc">
        To keep things easy, just log in with your work email or hit that button to continue!
      </div>

      {displayError && (
        <div className="auth-alert error" style={{ marginBottom: '20px' }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>{displayError}</span>
        </div>
      )}

      {/* Social Buttons */}
      <div className="auth-social-buttons">
        <button type="button" className="btn-social-google">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Sign in with Google</span>
        </button>

        <button type="button" className="btn-social-apple">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.1.09 2.23-.58 2.95-1.39z"/>
          </svg>
          <span>Sign in with Apple</span>
        </button>
      </div>

      <div className="auth-divider">
        <span>OR</span>
      </div>

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
          <label className="form-label" htmlFor="brandName">Business / Coaching Brand Name</label>
          <div className="form-input-wrapper">
            <svg className="form-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              id="brandName"
              type="text"
              className={`form-input has-icon ${displayError ? 'error' : ''}`}
              placeholder="Mind Mastery Coaching"
              value={brandName}
              onChange={handleInputChange(setBrandName)}
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
              placeholder="example@gmail.com"
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

        {/* Switch toggler */}
        <div className="switch-group">
          <div className="switch-label-col">
            <span className="switch-title">Receive feature updates and coaching tips</span>
            <span className="switch-desc">Get occasional insights, new feature releases, and smart coaching strategies right in your inbox.</span>
          </div>
          <label className="switch-control">
            <input 
              type="checkbox" 
              checked={receiveUpdates}
              onChange={(e) => setReceiveUpdates(e.target.checked)}
            />
            <span className="switch-slider"></span>
          </label>
        </div>

        <button type="submit" className="btn-primary-green" disabled={isLoading}>
          {isLoading ? <div className="btn-spinner" /> : 'Register'}
        </button>

        <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '12px', textAlign: 'center', lineHeight: '1.4' }}>
          By registering, you agree to our <a href="#terms" className="form-link" style={{ fontSize: '11px' }}>Terms & Conditions</a> and <a href="#privacy" className="form-link" style={{ fontSize: '11px' }}>Privacy Policy</a>.
        </p>
      </form>

      <div className="auth-footer">
        Already signed up? <Link to="/login">Log in here</Link>
      </div>
    </div>
  )
}
