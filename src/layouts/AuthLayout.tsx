import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Animated Background */}
      <div className="auth-bg">
        <div className="auth-bg-orb auth-bg-orb--1" />
        <div className="auth-bg-orb auth-bg-orb--2" />
        <div className="auth-bg-orb auth-bg-orb--3" />
        <div className="auth-bg-grid" />
      </div>

      <div className="auth-container">
        {/* Left Panel — Branding (Desktop) */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <div className="auth-brand-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="auth-brand-name">CoachFlow</span>
            </div>

            <h1 className="auth-brand-heading">
              Manage Programs.<br />
              Empower Clients.<br />
              <span className="auth-brand-accent">Grow Your Business.</span>
            </h1>

            <p className="auth-brand-desc">
              The all-in-one platform for professional coaches to deliver 
              world-class coaching experiences at scale.
            </p>

            <div className="auth-brand-features">
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/></svg>
                </div>
                <div>
                  <strong>Client Management</strong>
                  <p>Track progress, tasks, and engagement</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>
                </div>
                <div>
                  <strong>Program Builder</strong>
                  <p>Create structured coaching programs</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                </div>
                <div>
                  <strong>Task System</strong>
                  <p>Assign, track, and review client tasks</p>
                </div>
              </div>
            </div>

            <div className="auth-brand-social-proof">
              <div className="auth-avatars">
                <div className="auth-avatar" style={{ background: '#7c3aed' }}>SA</div>
                <div className="auth-avatar" style={{ background: '#6366f1' }}>MK</div>
                <div className="auth-avatar" style={{ background: '#10b981' }}>JL</div>
                <div className="auth-avatar" style={{ background: '#f59e0b' }}>RW</div>
              </div>
              <p>Trusted by <strong>2,400+</strong> coaches worldwide</p>
            </div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="auth-form-panel">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
