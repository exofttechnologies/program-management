import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar and Navbar will be built here */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
