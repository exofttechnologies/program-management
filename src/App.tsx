import { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import ToastContainer from './components/ui/toast/ToastContainer'
import { useAuthStore } from './store/authStore'

function App() {
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <HashRouter>
      <AppRoutes />
      <ToastContainer />
    </HashRouter>
  )
}

export default App
