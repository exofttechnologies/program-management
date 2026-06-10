/**
 * Simple toast notification utility
 * In a production app, you might use react-hot-toast, sonner, or similar
 */

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  message: string
}

const listeners: Set<(toast: Toast) => void> = new Set()
let toastId = 0

export function showToast(message: string, type: ToastType = 'info') {
  const id = `toast-${++toastId}`
  const toast: Toast = { id, type, message }

  listeners.forEach((listener) => listener(toast))

  // Auto-remove after 4 seconds
  setTimeout(() => {
    removeToast(id)
  }, 4000)

  return id
}

export function removeToast(id: string) {
  // This could be extended to manage a list of toasts
}

export function onToast(listener: (toast: Toast) => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const toast = {
  success: (message: string) => showToast(message, 'success'),
  error: (message: string) => showToast(message, 'error'),
  info: (message: string) => showToast(message, 'info'),
  warning: (message: string) => showToast(message, 'warning'),
}
