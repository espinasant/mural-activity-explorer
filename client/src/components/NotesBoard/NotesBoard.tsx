import type { Note as NoteType } from "@/types/notes"
import type { AvailableFilters, NoteFilter } from "@/types/filter"
import NoteCard from "./NoteCard"
import { useMemo } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { buildNotesViewModel } from "@/utils/notes"

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
    <TransformWrapper
      initialScale={0.8}
      limitToBounds={true}
      minPositionX={-maxBounds.x / 2}
      minPositionY={-maxBounds.y / 2}
      maxPositionX={maxBounds.x / 2}
      maxPositionY={maxBounds.y / 2}
      maxScale={5}
      minScale={0.8}
      autoAlignment={{ disabled: true }}
      wheel={{ step: 0.001 }}
    >
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", cursor: "grab" }}
      >
        <div className="relative h-full w-full">
          {notesViewModel.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  )
}

export default NotesBoard
