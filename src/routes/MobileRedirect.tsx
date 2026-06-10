import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MobileRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    // Treat width <= 768 as mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    if (isMobile) navigate('/login', { replace: true })
    else navigate('/client', { replace: true })
  }, [navigate])

  return null
}
