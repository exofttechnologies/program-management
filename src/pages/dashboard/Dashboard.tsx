import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import ProgramsPage from '../programs/ProgramsPage'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('home')
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null)

  // Dummy data
  const [programs, setPrograms] = useState([
    { id: '1', name: 'Mind Transformation', color: 'purple', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400' },
    { id: '2', name: 'Business Mastery', color: 'green', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400' },
    { id: '3', name: 'Health & Fitness', color: 'orange', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400' },
  ])

  const [dummyTasks, setDummyTasks] = useState<Record<string, {id: number, title: string, day: string}[]>>({
    '1': [{ id: 1, title: 'Morning Gratitude', day: 'Day 1' }, { id: 2, title: 'Journal Exercise', day: 'Day 1' }],
    '2': [{ id: 3, title: 'Read Chapter 1', day: 'Day 2' }],
    '3': []
  })

  const [dummyNotes, setDummyNotes] = useState<Record<string, {id: number, content: string}[]>>({
    '1': [{ id: 1, content: 'Remember to remind everyone about the daily check-in.' }]
  })

  const [dummySessions, setDummySessions] = useState<Record<string, {id: number, title: string, url: string}[]>>({
    '1': [{ id: 1, title: 'Session 1: Mindset Basics', url: '#' }]
  })

  const [dummyZoom, setDummyZoom] = useState<Record<string, string>>({
    '1': 'https://zoom.us/j/123456789'
  })

  const [dummyClients, setDummyClients] = useState<Record<string, {id: number, name: string, email: string}[]>>({
    '1': [{ id: 1, name: 'Muhammed', email: 'muhammed@example.com' }, { id: 2, name: 'Fatima', email: 'fatima@example.com' }],
    '2': [{ id: 3, name: 'Ameen', email: 'ameen@example.com' }],
    '3': []
  })

  const [dummyCoaches, setDummyCoaches] = useState([
    { id: 1, name: 'Sarah Jenkins', email: 'sarah@coachflow.com', role: 'Head Coach' },
    { id: 2, name: 'David Chen', email: 'david@coachflow.com', role: 'Mindset Coach' }
  ])

  const [isCreatingProgram, setIsCreatingProgram] = useState(false)
  const [newProgram, setNewProgram] = useState({ title: '', image: '', description: '', duration: '' })

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const firstName = user?.fullName?.split(' ')[0] || 'Ahmed'

  return (
    <div className="ad-layout-container">
      {/* ═══ DESKTOP SIDEBAR ═══ */}
      <aside className="ad-desktop-sidebar">
        <div className="ad-sidebar-logo">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          CoachFlow
        </div>
        <nav className="ad-sidebar-nav">
          <button className={`ad-sidebar-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setSelectedProgramId(null); }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            Home
          </button>
          <button className={`ad-sidebar-item ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => { setActiveTab('programs'); setSelectedProgramId(null); }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
            Programs
          </button>
          <button className={`ad-sidebar-item ${activeTab === 'coaches' ? 'active' : ''}`} onClick={() => { setActiveTab('coaches'); setSelectedProgramId(null); }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Coaches
          </button>
          <button className={`ad-sidebar-item ${activeTab === 'clients' ? 'active' : ''}`} onClick={() => { setActiveTab('clients'); setSelectedProgramId(null); }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Clients
          </button>
          <button className={`ad-sidebar-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setSelectedProgramId(null); }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Settings
          </button>
        </nav>
      </aside>

      {/* ═══ MAIN APP CONTAINER ═══ */}
      <div className="ad-main-wrapper">
        <div className="ad-viewport">
          {/* ═══ MOBILE HEADER ═══ */}
          <header className="ad-header">
            <button className="ad-menu-btn" aria-label="Menu" onClick={handleLogout}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="ad-header-right">
              <button className="ad-notif-btn" aria-label="Notifications">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                <span className="ad-notif-badge">3</span>
              </button>
              <div className="ad-header-avatar">
                {/* Reusing placeholder image from reference style if possible, else initial */}
                {user?.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" /> : firstName.charAt(0)}
              </div>
            </div>
          </header>

          {/* ═══ HOME TAB ═══ */}
          {activeTab === 'home' && (
            <div className="animate-fade-in">
              {/* GREETING */}
              <section className="ad-greeting">
                <h1>Hi, {firstName} 👋</h1>
                <p>Here's what's happening in your coaching business.</p>
              </section>

              {/* CURRENTLY RUNNING PROGRAMS */}
              <div className="ad-section-header">
                <h2>Currently Running Programs</h2>
                <button className="ad-view-all">View All</button>
              </div>
              <div className="ad-programs-scroll">
                <div className="ad-program-card">
                  <div className="ad-program-card-header">
                    <div className="ad-program-icon purple">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </div>
                    <button className="ad-program-arrow">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                  <h3>Mind Transformation</h3>
                  <div className="ad-program-clients">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    45 Active Clients
                  </div>
                  <div className="ad-program-progress-wrapper">
                    <div className="ad-program-progress-bar">
                      <div className="ad-program-progress-fill purple" style={{ width: '65%' }}></div>
                    </div>
                    <div className="ad-program-progress-text purple">65%</div>
                  </div>
                  <div className="ad-program-stats">
                    <div className="ad-program-stat">
                      <svg width="14" height="14" className="purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      18 Sessions
                    </div>
                    <div className="ad-program-stat">
                      <svg width="14" height="14" className="purple" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      12 Tasks
                    </div>
                  </div>
                </div>

                <div className="ad-program-card">
                  <div className="ad-program-card-header">
                    <div className="ad-program-icon green">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <button className="ad-program-arrow">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                  <h3>Business Mastery</h3>
                  <div className="ad-program-clients">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    32 Active Clients
                  </div>
                  <div className="ad-program-progress-wrapper">
                    <div className="ad-program-progress-bar">
                      <div className="ad-program-progress-fill green" style={{ width: '40%' }}></div>
                    </div>
                    <div className="ad-program-progress-text green">40%</div>
                  </div>
                  <div className="ad-program-stats">
                    <div className="ad-program-stat">
                      <svg width="14" height="14" className="green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      14 Sessions
                    </div>
                    <div className="ad-program-stat">
                      <svg width="14" height="14" className="green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      8 Tasks
                    </div>
                  </div>
                </div>

                <div className="ad-program-card">
                  <div className="ad-program-card-header">
                    <div className="ad-program-icon orange">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <button className="ad-program-arrow">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                  <h3>Health & Fitness</h3>
                  <div className="ad-program-clients">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    28 Active Clients
                  </div>
                  <div className="ad-program-progress-wrapper">
                    <div className="ad-program-progress-bar">
                      <div className="ad-program-progress-fill orange" style={{ width: '80%' }}></div>
                    </div>
                    <div className="ad-program-progress-text orange">80%</div>
                  </div>
                  <div className="ad-program-stats">
                    <div className="ad-program-stat">
                      <svg width="14" height="14" className="orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      12 Sessions
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="ad-section-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="ad-quick-actions-grid">
                <div className="ad-action-card purple" onClick={() => { setActiveTab('clients'); setSelectedProgramId(null); }}>
                  <div className="ad-action-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                  </div>
                  <span>Invite Client</span>
                </div>
                <div className="ad-action-card blue" onClick={() => { setActiveTab('programs'); setIsCreatingProgram(true); setSelectedProgramId(null); }}>
                  <div className="ad-action-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                  </div>
                  <span>Create Program</span>
                </div>
                <div className="ad-action-card orange">
                  <div className="ad-action-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                  </div>
                  <span>Create Task</span>
                </div>
                <div className="ad-action-card green">
                  <div className="ad-action-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <span>Upload Session</span>
                </div>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="ad-section-header">
                <h2>Recent Activity</h2>
                <button className="ad-view-all">View All</button>
              </div>
              <div className="ad-activity-list">
                <div className="ad-activity-item">
                  <div className="ad-activity-icon-wrapper green">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                  </div>
                  <div className="ad-activity-content">
                    <div className="ad-activity-title">Muhammed joined Mind Transformation Program</div>
                  </div>
                  <div className="ad-activity-time">2m ago</div>
                </div>
                
                <div className="ad-activity-item">
                  <div className="ad-activity-icon-wrapper purple">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="ad-activity-content">
                    <div className="ad-activity-title">Ameen completed Session 4</div>
                    <div className="ad-activity-subtitle">Mind Transformation Program</div>
                  </div>
                  <div className="ad-activity-time">15m ago</div>
                </div>

                <div className="ad-activity-item">
                  <div className="ad-activity-icon-wrapper orange">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </div>
                  <div className="ad-activity-content">
                    <div className="ad-activity-title">Fatima completed task "Daily Journaling"</div>
                    <div className="ad-activity-subtitle">Mind Transformation Program</div>
                  </div>
                  <div className="ad-activity-time">1h ago</div>
                </div>

                <div className="ad-activity-item">
                  <div className="ad-activity-icon-wrapper blue">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <div className="ad-activity-content">
                    <div className="ad-activity-title">New session "The Power of Mindset" uploaded</div>
                    <div className="ad-activity-subtitle">Mind Transformation Program</div>
                  </div>
                  <div className="ad-activity-time">2h ago</div>
                </div>
              </div>

              {/* OVERVIEW */}
              <div className="ad-section-header">
                <h2>Overview</h2>
              </div>
              <div className="ad-overview-grid">
                <div className="ad-overview-card">
                  <div className="ad-overview-icon purple">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h3>128</h3>
                  <p>Total Clients</p>
                  <div className="ad-overview-trend purple">↑ 12% this month</div>
                </div>
                
                <div className="ad-overview-card">
                  <div className="ad-overview-icon green">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                  </div>
                  <h3>12</h3>
                  <p>Active Programs</p>
                  <div className="ad-overview-trend green">↑ 2 new</div>
                </div>

                <div className="ad-overview-card">
                  <div className="ad-overview-icon orange">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </div>
                  <h3>18</h3>
                  <p>Pending Tasks</p>
                  <div className="ad-overview-trend orange">↑ 5 today</div>
                </div>

                <div className="ad-overview-card">
                  <div className="ad-overview-icon blue">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3>246</h3>
                  <p>Completed Tasks</p>
                  <div className="ad-overview-trend blue">↑ 18% this month</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="animate-fade-in" style={{ padding: 0 }}>
              <ProgramsPage />
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="animate-fade-in" style={{ padding: '20px 0' }}>
              {!selectedProgramId ? (
                <>
                  <div className="ad-section-header" style={{ marginTop: 0 }}>
                    <h2>Select Program Clients</h2>
                  </div>
                  <div className="ad-program-grid">
                    {programs.map(prog => (
                      <div 
                        key={prog.id} 
                        className="ad-program-poster-card"
                        onClick={() => setSelectedProgramId(prog.id)}
                      >
                        <img src={prog.image} alt={prog.name} className="ad-program-poster" />
                        <div className="ad-program-poster-content">
                          <h3>{prog.name}</h3>
                          <p>{dummyClients[prog.id]?.length || 0} Enrolled Clients</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="ad-section-header" style={{ marginTop: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => setSelectedProgramId(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                      </button>
                      <h2>{programs.find(p => p.id === selectedProgramId)?.name} Clients</h2>
                    </div>
                    <button 
                      onClick={() => {
                        const email = prompt("Enter client email to invite to this program:");
                        if (email) {
                          setDummyClients(prev => ({
                            ...prev,
                            [selectedProgramId]: [...(prev[selectedProgramId] || []), { id: Date.now(), name: email.split('@')[0], email }]
                          }))
                        }
                      }}
                      style={{ padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
                    >+ Invite Client</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(dummyClients[selectedProgramId] || []).length === 0 ? (
                      <p style={{ fontSize: '0.8rem', color: '#6b7280', textAlign: 'center', padding: '20px 0' }}>No clients in this program yet.</p>
                    ) : (
                      (dummyClients[selectedProgramId] || []).map(client => (
                        <div key={client.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem' }}>
                              {client.name.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#111827' }}>{client.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{client.email}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => {
                                if(window.confirm('Are you sure you want to remove this client?')) {
                                  setDummyClients(prev => ({
                                    ...prev,
                                    [selectedProgramId]: prev[selectedProgramId].filter(c => c.id !== client.id)
                                  }))
                                }
                              }}
                              style={{ padding: '6px 12px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                              Remove
                            </button>
                            <button style={{ padding: '6px 12px', background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                              Manage
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'coaches' && (
            <div className="animate-fade-in" style={{ padding: '20px 0' }}>
              <div className="ad-section-header" style={{ marginTop: 0 }}>
                <h2>Team Coaches</h2>
                <button 
                  onClick={() => {
                    const email = prompt("Enter coach email to invite:");
                    if(email) setDummyCoaches(prev => [...prev, { id: Date.now(), name: email.split('@')[0], email, role: 'Coach' }]);
                  }}
                  style={{ padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
                >+ Invite Coach</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dummyCoaches.length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', textAlign: 'center', padding: '20px 0' }}>No coaches invited yet.</p>
                ) : (
                  dummyCoaches.map(coach => (
                    <div key={coach.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fce7f3', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem' }}>
                          {coach.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#111827' }}>{coach.name} <span style={{ fontSize: '0.65rem', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', color: '#4b5563' }}>{coach.role}</span></div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{coach.email}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          if(window.confirm('Remove this coach from the team?')) {
                            setDummyCoaches(prev => prev.filter(c => c.id !== coach.id));
                          }
                        }}
                        style={{ padding: '6px 12px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in" style={{ padding: '20px 0' }}>
              <div className="ad-section-header" style={{ marginTop: 0 }}>
                <h2>Settings</h2>
              </div>
              
              <div className="ad-settings-container">
                {/* Profile Settings */}
                <div className="ad-settings-card">
                  <div className="ad-settings-header">
                    <h3>Account</h3>
                  </div>
                  <div className="ad-settings-row">
                    <div className="ad-settings-row-left">
                      <div className="ad-settings-icon">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <div className="ad-settings-info">
                        <h4>Profile Information</h4>
                        <p>Update your name, email, and avatar.</p>
                      </div>
                    </div>
                    <div className="ad-settings-action">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                  <div className="ad-settings-row">
                    <div className="ad-settings-row-left">
                      <div className="ad-settings-icon">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </div>
                      <div className="ad-settings-info">
                        <h4>Password & Security</h4>
                        <p>Manage your password and 2FA settings.</p>
                      </div>
                    </div>
                    <div className="ad-settings-action">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="ad-settings-card">
                  <div className="ad-settings-header">
                    <h3>Preferences</h3>
                  </div>
                  <div className="ad-settings-row">
                    <div className="ad-settings-row-left">
                      <div className="ad-settings-icon">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      </div>
                      <div className="ad-settings-info">
                        <h4>Notifications</h4>
                        <p>Configure email and push notifications.</p>
                      </div>
                    </div>
                    <div className="ad-settings-action">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                  <div className="ad-settings-row">
                    <div className="ad-settings-row-left">
                      <div className="ad-settings-icon">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      </div>
                      <div className="ad-settings-info">
                        <h4>Language & Region</h4>
                        <p>Set your primary language and timezone.</p>
                      </div>
                    </div>
                    <div className="ad-settings-action">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>

                {/* Billing */}
                <div className="ad-settings-card">
                  <div className="ad-settings-header">
                    <h3>Billing</h3>
                  </div>
                  <div className="ad-settings-row">
                    <div className="ad-settings-row-left">
                      <div className="ad-settings-icon">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      </div>
                      <div className="ad-settings-info">
                        <h4>Payment Methods</h4>
                        <p>Manage your linked credit cards.</p>
                      </div>
                    </div>
                    <div className="ad-settings-action">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                  <div className="ad-settings-row">
                    <div className="ad-settings-row-left">
                      <div className="ad-settings-icon">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div className="ad-settings-info">
                        <h4>Invoices</h4>
                        <p>View and download past invoices.</p>
                      </div>
                    </div>
                    <div className="ad-settings-action">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>

                {/* Destructive Actions */}
                <div style={{ marginTop: '12px' }}>
                  <button 
                    onClick={handleLogout}
                    style={{ width: '100%', padding: '16px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Log Out
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ═══ MOBILE BOTTOM NAVIGATION ═══ */}
          <nav className="ad-bottom-nav">
            <button className={`ad-nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setSelectedProgramId(null); }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              <span>Home</span>
            </button>
            <button className={`ad-nav-item ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => { setActiveTab('programs'); setSelectedProgramId(null); }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              <span>Programs</span>
            </button>
            <button className={`ad-nav-item ${activeTab === 'coaches' ? 'active' : ''}`} onClick={() => { setActiveTab('coaches'); setSelectedProgramId(null); }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span>Coaches</span>
            </button>
            <button className={`ad-nav-item ${activeTab === 'clients' ? 'active' : ''}`} onClick={() => { setActiveTab('clients'); setSelectedProgramId(null); }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span>Clients</span>
            </button>
            <button className={`ad-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setSelectedProgramId(null); }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
