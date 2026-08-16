interface FilterItem {
  value: string
  label: string
  isEnabled: boolean
}

interface NoteFilter {
    author: string[]
    color: string[]
    until?: number
  }

interface NotesFiltersOptions {
  author: FilterItem[]
  color: FilterItem[]
  until: number
}

interface TimeRange {
  start: number
  end: number
}

interface AvailableFilters extends Pick<NoteFilter, "author" | "color"> {
  until: TimeRange
}

export type { FilterItem, NotesFiltersOptions, AvailableFilters, NoteFilter, TimeRange }
