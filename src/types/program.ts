export interface Program {
  id: string
  name: string
  description: string
  status: 'active' | 'draft' | 'archived'
  clientCount: number
  sessionCount: number
  completionRate: number
  gradient: string
  lastUpdated: string
}
