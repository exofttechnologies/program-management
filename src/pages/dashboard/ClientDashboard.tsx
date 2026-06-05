import { useState } from 'react'
import './ClientDashboard.css'

export default function ClientDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning Gratitude', done: true },
    { id: 2, title: 'Journal Exercise', done: true },
    { id: 3, title: 'Meditation Practice', done: false },
    { id: 4, title: 'Mindset Reflection', done: false },
  ])

  const [sessions, setSessions] = useState([
    { id: 1, title: 'The Power of Mindset', num: 'Session 1', status: 'completed', progress: 100 },
    { id: 2, title: 'Reprogram Your Beliefs', num: 'Session 2', status: 'completed', progress: 100 },
    { id: 3, title: 'Emotional Mastery', num: 'Session 3', status: 'in-progress', progress: 60 },
    { id: 4, title: 'Habits for Success', num: 'Session 4', status: 'locked', progress: 0 },
  ])

  const [followups, setFollowups] = useState([
    { id: 1, coach: 'Ahmed Khan', date: '10 June 2026', time: '07:00 PM', status: 'Scheduled' },
  ])

  const [resources, setResources] = useState([
    { id: 1, name: 'Workbook PDF', type: 'pdf', size: '2.4 MB' },
    { id: 2, name: 'Daily Tracker Sheet', type: 'sheet', size: '1.2 MB' },
    { id: 3, name: 'Meditation Audio', type: 'audio', size: '14.5 MB' },
    { id: 4, name: 'Reflection Sheet', type: 'sheet', size: '820 KB' },
  ])

  const [activeTab, setActiveTab] = useState('home')
  
  // Toggles to demonstrate Empty States
  const [showEmptyTasks, setShowEmptyTasks] = useState(false)
  const [showEmptySessions, setShowEmptySessions] = useState(false)
  const [showEmptyFollowups, setShowEmptyFollowups] = useState(false)
  const [showEmptyResources, setShowEmptyResources] = useState(false)

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const completedTasks = tasks.filter(t => t.done).length

  // Helper render for Empty State
  const renderEmptyState = (title: string, message: string, onAction?: () => void, actionText?: string) => (
    <div className="cd-empty-state animate-fade-in">
      <div className="cd-empty-icon">
        <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h4>{title}</h4>
      <p>{message}</p>
      {onAction && actionText && (
        <button className="cd-empty-btn" onClick={onAction}>{actionText}</button>
      )}
    </div>
  )

  return (
    <div className="cd-layout-container">
      {/* ═══ DESKTOP SIDEBAR ═══ */}
      <aside className="cd-desktop-sidebar">
        <div className="cd-sidebar-brand">
          <div className="cd-sidebar-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span>CoachFlow</span>
        </div>

        <nav className="cd-sidebar-links">
          <button className={`cd-sidebar-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10"/></svg>
            <span>Home</span>
          </button>
          <button className={`cd-sidebar-link ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span>Sessions</span>
          </button>
          <button className={`cd-sidebar-link ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
            <span>Tasks</span>
          </button>
          <button className={`cd-sidebar-link ${activeTab === 'followups' ? 'active' : ''}`} onClick={() => setActiveTab('followups')}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span>Follow-Ups</span>
          </button>
          <button className={`cd-sidebar-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span>Profile</span>
          </button>
        </nav>

        <div className="cd-sidebar-footer">
          <div className="cd-sidebar-avatar">M</div>
          <div className="cd-sidebar-footer-meta">
            <strong>Muhammed</strong>
            <span>Client</span>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN APP CONTAINER ═══ */}
      <div className="cd-main-wrapper">
        <div className="cd-viewport">
          {/* ═══ MOBILE HEADER ═══ */}
          <header className="cd-header animate-fade-up">
            <button className="cd-menu-btn" aria-label="Menu">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="cd-header-right">
              <button className="cd-notif-btn" aria-label="Notifications">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                <span className="cd-notif-badge">3</span>
              </button>
              <div className="cd-header-avatar">M</div>
            </div>
          </header>

          {/* Demo Controls overlay for testing Empty States */}
          <div className="demo-toggle-bar">
            <span>Empty States:</span>
            <label><input type="checkbox" checked={showEmptyTasks} onChange={(e) => setShowEmptyTasks(e.target.checked)} /> Tasks</label>
            <label><input type="checkbox" checked={showEmptySessions} onChange={(e) => setShowEmptySessions(e.target.checked)} /> Sessions</label>
            <label><input type="checkbox" checked={showEmptyFollowups} onChange={(e) => setShowEmptyFollowups(e.target.checked)} /> Followups</label>
            <label><input type="checkbox" checked={showEmptyResources} onChange={(e) => setShowEmptyResources(e.target.checked)} /> Resources</label>
          </div>

          {/* ═══ VIEW ROUTER ═══ */}
          {activeTab === 'home' && (
            <div className="cd-tab-view animate-fade-in">
              {/* ═══ GREETING ═══ */}
              <section className="cd-greeting">
                <h1>Hi, Muhammed 👋</h1>
                <p>Keep showing up. Small steps create big transformations.</p>
              </section>

              {/* ═══ PROGRAM PROGRESS HERO ═══ */}
              <section className="cd-hero">
                <div className="cd-hero-card">
                  <div className="cd-hero-glow" />
                  <div className="cd-hero-top">
                    <div className="cd-hero-icon">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 3z"/><path strokeLinecap="round" d="M17 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/></svg>
                    </div>
                    <div className="cd-hero-info">
                      <div className="cd-hero-title-row">
                        <h2>Mind Transformation Program</h2>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                      </div>
                      <span className="cd-hero-day">Day 18 of 90</span>
                    </div>
                  </div>

                  <div className="cd-hero-progress-section">
                    <div className="cd-hero-progress-header">
                      <span>Overall Progress</span>
                      <span className="cd-hero-pct">45%</span>
                    </div>
                    <div className="cd-hero-bar-track">
                      <div className="cd-hero-bar-fill" style={{ width: '45%' }}>
                        <div className="cd-hero-bar-glow" />
                      </div>
                    </div>
                    <span className="cd-hero-sessions">18 / 40 Sessions Completed</span>
                  </div>
                </div>
              </section>

              {/* ═══ CARDS GRID ═══ */}
              <div className="cd-dashboard-grid">
                {/* Today's Tasks */}
                <div className="cd-card cd-tasks-card">
                  <div className="cd-card-header">
                    <div className="cd-card-title-group">
                      <div className="cd-card-icon cd-card-icon--purple">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                      </div>
                      <h3>Today's Tasks</h3>
                    </div>
                    <button className="cd-view-all" onClick={() => setActiveTab('tasks')}>View All</button>
                  </div>

                  {showEmptyTasks ? renderEmptyState('No Tasks Today', 'Great job! You have cleared all your daily tasks.') : (
                    <>
                      <div className="cd-tasks-list">
                        {tasks.map(task => (
                          <label key={task.id} className={`cd-task-item ${task.done ? 'done' : ''}`}>
                            <div className={`cd-task-check ${task.done ? 'checked' : ''}`} onClick={() => toggleTask(task.id)}>
                              {task.done && (
                                <svg width="12" height="12" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                              )}
                            </div>
                            <span className="cd-task-text">{task.title}</span>
                          </label>
                        ))}
                      </div>

                      <div className="cd-tasks-counter">
                        <div className="cd-tasks-counter-bar">
                          <div className="cd-tasks-counter-fill" style={{ width: `${(completedTasks / tasks.length) * 100}%` }} />
                        </div>
                        <span>{completedTasks}/{tasks.length} completed</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Next Follow-Up */}
                <div className="cd-card cd-followup-card">
                  <div className="cd-card-header">
                    <div className="cd-card-title-group">
                      <div className="cd-card-icon cd-card-icon--indigo">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      </div>
                      <h3>Next Follow-Up</h3>
                    </div>
                  </div>

                  {showEmptyFollowups ? renderEmptyState('No Scheduled Follow-ups', 'Contact your coach to schedule your next session.') : (
                    <div className="cd-followup-body">
                      <div className="cd-followup-coach-row">
                        <div>
                          <span className="cd-followup-label">Coach</span>
                          <strong className="cd-followup-name">Ahmed Khan</strong>
                        </div>
                        <div className="cd-followup-avatar">AK</div>
                      </div>

                      <div className="cd-followup-details">
                        <div className="cd-followup-detail">
                          <span className="cd-followup-label">Date</span>
                          <strong>10 June 2026</strong>
                        </div>
                        <div className="cd-followup-detail">
                          <span className="cd-followup-label">Time</span>
                          <strong>07:00 PM</strong>
                        </div>
                      </div>

                      <button className="cd-followup-action" onClick={() => setActiveTab('followups')}>
                        <span>View Details</span>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Latest Coach Note */}
                <div className="cd-card cd-note-card">
                  <div className="cd-card-header">
                    <div className="cd-card-title-group">
                      <div className="cd-card-icon cd-card-icon--amber">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
                      </div>
                      <h3>Latest Coach Note</h3>
                    </div>
                  </div>
                  <div className="cd-note-bubble">
                    <p>"Excellent progress this week. Focus on consistency and daily action."</p>
                  </div>
                  <div className="cd-note-meta">
                    <span>Coach Ahmed Khan</span>
                    <span>2 days ago</span>
                  </div>
                </div>

                {/* Recent Sessions */}
                <div className="cd-card cd-sessions-card">
                  <div className="cd-card-header">
                    <div className="cd-card-title-group">
                      <div className="cd-card-icon cd-card-icon--green">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                      </div>
                      <h3>Recent Sessions</h3>
                    </div>
                    <button className="cd-view-all" onClick={() => setActiveTab('sessions')}>View All</button>
                  </div>

                  {showEmptySessions ? renderEmptyState('No Available Sessions', 'All caught up! New sessions will be released soon.') : (
                    <div className="cd-sessions-list">
                      {sessions.slice(0, 3).map(session => (
                        <div key={session.id} className="cd-session-item">
                          <div className={`cd-session-thumb ${session.status}`}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" d="M5 3l14 9-14 9V3z" fill="currentColor" stroke="none"/>
                            </svg>
                            {session.status === 'in-progress' && <div className="cd-session-pct">{session.progress}%</div>}
                          </div>
                          <div className="cd-session-info">
                            <span className="cd-session-num">{session.num}</span>
                            <strong>{session.title}</strong>
                            <span className={`cd-session-status ${session.status === 'completed' ? 'done' : 'progress'}`}>
                              {session.status === 'completed' && (
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                              )}
                              {session.status === 'completed' ? 'Completed' : 'In Progress'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Achievements Card */}
                <div className="cd-card cd-achievements-dashboard">
                  <div className="cd-card-header">
                    <div className="cd-card-title-group">
                      <div className="cd-card-icon cd-card-icon--amber">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                      </div>
                      <h3>Achievements</h3>
                    </div>
                  </div>
                  <div className="cd-achievements-grid">
                    <div className="cd-achievement-item">
                      <div className="cd-achievement-emoji">🔥</div>
                      <strong>7 Day</strong>
                      <span>Streak</span>
                    </div>
                    <div className="cd-achievement-item">
                      <div className="cd-achievement-emoji">🏆</div>
                      <strong>14</strong>
                      <span>Tasks Done</span>
                    </div>
                    <div className="cd-achievement-item">
                      <div className="cd-achievement-emoji">🎥</div>
                      <strong>18</strong>
                      <span>Sessions</span>
                    </div>
                    <div className="cd-achievement-item">
                      <div className="cd-achievement-emoji">⭐</div>
                      <strong>3</strong>
                      <span>Milestones</span>
                    </div>
                  </div>
                </div>

                {/* Program Resources */}
                <div className="cd-card cd-resources-dashboard">
                  <div className="cd-card-header">
                    <div className="cd-card-title-group">
                      <div className="cd-card-icon cd-card-icon--blue">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                      </div>
                      <h3>Program Resources</h3>
                    </div>
                  </div>

                  {showEmptyResources ? renderEmptyState('No Resources Yet', 'Resources assigned by your coach will appear here.') : (
                    <div className="cd-resources-grid">
                      {resources.map(res => (
                        <button key={res.id} className="cd-resource-item">
                          <div className={`cd-resource-icon cd-resource-icon--${res.type === 'pdf' ? 'red' : res.type === 'sheet' ? 'green' : 'indigo'}`}>
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                            </svg>
                          </div>
                          <span>{res.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Support Card */}
              <section className="cd-support">
                <div className="cd-support-card">
                  <div className="cd-support-left">
                    <div className="cd-support-icon">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    </div>
                    <div>
                      <strong>Need Support?</strong>
                      <p>We're here to help you on your journey.</p>
                    </div>
                  </div>
                  <button className="cd-support-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    Chat on WhatsApp
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* ═══ SESSIONS TAB VIEW ═══ */}
          {activeTab === 'sessions' && (
            <div className="cd-tab-view animate-fade-in">
              <section className="cd-greeting">
                <h1>Watch Sessions</h1>
                <p>Unlock new material as you progress through your transformation.</p>
              </section>

              {showEmptySessions ? renderEmptyState('No Sessions Found', 'All coaching sessions are currently empty.') : (
                <div className="cd-full-list">
                  {sessions.map(session => (
                    <div key={session.id} className={`cd-session-list-item ${session.status === 'locked' ? 'locked' : ''}`}>
                      <div className={`cd-session-icon-box ${session.status}`}>
                        {session.status === 'locked' ? (
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                      <div className="cd-session-meta-info">
                        <span className="cd-session-tag">{session.num} • {session.status.toUpperCase()}</span>
                        <h4>{session.title}</h4>
                      </div>
                      <div className="cd-session-action">
                        {session.status === 'locked' ? (
                          <span className="cd-locked-lbl">Locked</span>
                        ) : (
                          <button className="cd-play-btn">Play</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ TASKS TAB VIEW ═══ */}
          {activeTab === 'tasks' && (
            <div className="cd-tab-view animate-fade-in">
              <section className="cd-greeting">
                <h1>Complete Tasks</h1>
                <p>Stay consistent with daily exercises curated by your coach.</p>
              </section>

              {showEmptyTasks ? renderEmptyState('All Clear!', 'No pending tasks left for today. Keep up the consistency.') : (
                <div className="cd-full-list">
                  {tasks.map(task => (
                    <div key={task.id} className={`cd-task-list-item ${task.done ? 'done' : ''}`} onClick={() => toggleTask(task.id)}>
                      <div className={`cd-task-check ${task.done ? 'checked' : ''}`}>
                        {task.done && <svg width="12" height="12" fill="none" stroke="white" strokeWidth="3.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <div className="cd-task-details">
                        <h4>{task.title}</h4>
                        <p>{task.done ? 'Completed today' : 'Pending completion'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ FOLLOW-UPS TAB VIEW ═══ */}
          {activeTab === 'followups' && (
            <div className="cd-tab-view animate-fade-in">
              <section className="cd-greeting">
                <h1>Follow-Up Calendar</h1>
                <p>View scheduled live coaching reviews and consultations.</p>
              </section>

              {showEmptyFollowups ? renderEmptyState('No Appointments Scheduled', 'All appointments are currently logged.') : (
                <div className="cd-full-list">
                  {followups.map(item => (
                    <div key={item.id} className="cd-followup-list-item">
                      <div className="cd-followup-time-badge">
                        <span>JUNE</span>
                        <strong>10</strong>
                      </div>
                      <div className="cd-followup-list-details">
                        <h4>Live Alignment Review</h4>
                        <p>Coach: {item.coach} • {item.time}</p>
                      </div>
                      <span className="cd-badge scheduled">Scheduled</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ PROFILE TAB VIEW ═══ */}
          {activeTab === 'profile' && (
            <div className="cd-tab-view animate-fade-in">
              <section className="cd-greeting">
                <h1>Your Profile</h1>
                <p>Manage your account settings, program enrollment details and milestones.</p>
              </section>

              <div className="cd-profile-card">
                <div className="cd-profile-header">
                  <div className="cd-profile-avatar-large">M</div>
                  <h3>Muhammed</h3>
                  <p>muhammed@example.com</p>
                </div>
                <div className="cd-profile-details">
                  <div className="cd-profile-row">
                    <span>Enrolled Program</span>
                    <strong>Mind Transformation Program</strong>
                  </div>
                  <div className="cd-profile-row">
                    <span>Current Streak</span>
                    <strong>🔥 7 Days</strong>
                  </div>
                  <div className="cd-profile-row">
                    <span>Coach Assigned</span>
                    <strong>Ahmed Khan</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spacer for bottom nav */}
          <div className="cd-bottom-spacer" />

          {/* ═══ MOBILE BOTTOM NAVIGATION ═══ */}
          <nav className="cd-bottom-nav">
            <button className={`cd-nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10"/></svg>
              <span>Home</span>
            </button>
            <button className={`cd-nav-item ${activeTab === 'sessions' ? 'active' : ''}`} onClick={() => setActiveTab('sessions')}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              <span>Sessions</span>
            </button>
            <button className={`cd-nav-item ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
              <span>Tasks</span>
            </button>
            <button className={`cd-nav-item ${activeTab === 'followups' ? 'active' : ''}`} onClick={() => setActiveTab('followups')}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>Follow-Ups</span>
            </button>
            <button className={`cd-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span>Profile</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
