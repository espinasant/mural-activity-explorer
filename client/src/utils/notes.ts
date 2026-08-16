import type { Note, NoteViewModel } from "@/types/notes"
import { isNoteVisible } from "./filters"
import type { NoteFilter, AvailableFilters } from "@/types/filter"

const getDateCutoff = (availableFilters: AvailableFilters | null) => {
  return availableFilters?.until?.end
    ? new Date(availableFilters.until.end).setMinutes(
        new Date(availableFilters.until.end).getMinutes() - 15
      )
    : Date.now()
}

const getNoteDisplayColor = (color: string) => {
  switch (color) {
    case "pink":
      return "#ffbdd6"
    case "green":
      return "#b5eaa7"
    case "blue":
      return "#acccff"
    case "yellow":
      return "#fdff98"
    case "purple":
      return "#d0b5ff"
    case "orange":
      return "#ffc080"
  }
}

const buildNotesViewModel = (
  notes: Note[],
  selectedFilters: NoteFilter,
  availableFilters: AvailableFilters | null
): NoteViewModel[] => {
  return notes.map((note) => {
    return {
      ...note,
      isHidden: !isNoteVisible(note, selectedFilters),
      isLatest: Date.parse(note.createdAt) > getDateCutoff(availableFilters),
    }
  })
}

export { buildNotesViewModel, getNoteDisplayColor }