export interface Task {
  id: string
  title: string
  description: string
  clientName: string
  program: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'progress' | 'completed' | 'overdue'
  assignedBy: string
  progress: number
}
