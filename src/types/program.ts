export interface Program {
  id: string
  organization_id: string
  title: string
  description: string
  duration: string
  poster_url?: string
  zoom_link?: string
  created_at: string
}

export interface CreateProgramInput {
  title: string
  description: string
  duration: string
  poster_url?: string
  zoom_link?: string
}

export interface UpdateProgramInput {
  title?: string
  description?: string
  duration?: string
  poster_url?: string
  zoom_link?: string
}
