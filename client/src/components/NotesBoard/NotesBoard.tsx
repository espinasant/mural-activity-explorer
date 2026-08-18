import type { Note as NoteType } from "@/types/notes"
import type { AvailableFilters, NoteFilter } from "@/types/filter"
import NoteCard from "./NoteCard"
import { useMemo } from "react"
import { buildNotesViewModel } from "@/utils/notes"
import BoardWrapper from "./BoardWrapper"

interface NotesBoardProps {
  notes: NoteType[]
  selectedFilters: NoteFilter
  availableFilters: AvailableFilters | null
}

interface MaxBounds {
  x: number
  y: number
}

const NotesBoard: React.FC<NotesBoardProps> = ({ notes, selectedFilters }) => {
  const notesViewModel = useMemo(
    () => buildNotesViewModel(notes, selectedFilters),
    [notes, selectedFilters]
  )

  const maxBounds: MaxBounds = useMemo(() => {
    return {
      x: notesViewModel.reduce((max, note) => Math.max(max, note.x), 0),
      y: notesViewModel.reduce((max, note) => Math.max(max, note.y), 0),
    }
  }, [notesViewModel])

  return (
    <BoardWrapper maxBounds={maxBounds}>
      <div className="relative h-full w-full">
        {notesViewModel.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </BoardWrapper>
  )
}

export default NotesBoard
