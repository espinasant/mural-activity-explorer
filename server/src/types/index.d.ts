interface Note {
  id: string;
  createdAt: string;
  text: string;
  x: number;
  y: number;
  author: string;
  color: string;
}

interface NoteFilter {
  author?: string[];
  color?: string[];
  until?: number;
}

interface TimeRange {
  start: number
  end: number
}

interface AvailableFilters extends Required<Omit<NoteFilter, 'until'>> {
  until: TimeRange
}

interface NotesStats {
  totalNotes: number;
  notesByAuthor: Record<string, number>;
  notesByColor: Record<string, number>;
}

export type { Note, NoteFilter, AvailableFilters, TimeRange, NotesStats };