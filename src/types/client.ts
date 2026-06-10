export interface Client {
  id: string
  name: string
  email: string
  program: string
  status: 'active' | 'completed' | 'follow-up' | 'inactive'
  progress: number
  lastActivity: string
  coach: string
  enrolled: string
  summary: string
  tasks: ClientTask[]
}

export interface ClientTask {
  title: string
  status: 'Completed' | 'Pending'
  dueDate?: string
}
