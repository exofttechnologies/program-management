import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import './AuthLayout.css'

export default function AuthLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    if (location.pathname === '/login') {
      navigate('/client')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-wrapper">
        <div className="auth-container-card">
          {/* Left Panel — Branding (Desktop) */}
          <div className="auth-brand-panel">
            {/* Back Arrow */}
            <button onClick={handleBack} className="auth-back-btn" aria-label="Back">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>

            {/* Faded Background Logo Graphic */}
            <div className="auth-brand-faded-graphic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>

            {/* Branding content at bottom left */}
            <div className="auth-brand-bottom-content">
              <div className="auth-brand-logo-row">
                <div className="auth-brand-logo-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="auth-brand-title">CoachFlow</span>
              </div>

              <p className="auth-brand-tagline">
                CoachFlow is your complete program management platform designed to simplify client engagement and enhance coaching productivity. It supports growing coaching businesses from client intake to daily tracking. With CoachFlow, you can coach more efficiently.
              </p>

              {/* Left Footer Links */}
              <div className="auth-brand-footer-links">
                <a href="#about">About</a>
                <a href="#faq">FAQ</a>
                <a href="#support">Support</a>
              </div>
            </div>
          </div>

          {/* Right Panel — Form Outlet */}
          <div className="auth-form-panel">
            <div className="auth-form-container-scroll">
              <Outlet />
            </div>

            {/* Right Footer Copy */}
            <div className="auth-form-footer-copy">
              CoachFlow — Designed by Shahariya Alam Siyam — All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
