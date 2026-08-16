import type { AvailableFilters } from "./filter"

interface Note {
  id: string
  createdAt: string
  text: string
  x: number
  y: number
  author: string
  color: string
}

interface NoteViewModel extends Note {
  isHidden: boolean
  isLatest: boolean
}

interface NotesResponse {
  notes: Note[]
  filters: AvailableFilters
}

interface NotesStatsResponse {
  totalNotes: number
  notesByAuthor: Record<string, number>
  notesByColor: Record<string, number>
}

export type { Note, NoteViewModel, NotesResponse, NotesStatsResponse }
