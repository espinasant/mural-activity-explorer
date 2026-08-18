import type { Note, NoteViewModel } from "@/types/notes"
import { isNoteVisible } from "./filters"
import type { NoteFilter } from "@/types/filter"

const getDateCutoff = (until: number) => {
  return new Date(until).setMinutes(new Date(until).getMinutes() - 5)
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
  selectedFilters: NoteFilter
): NoteViewModel[] => {
  return notes.map((note) => {
    return {
      ...note,
      isHidden: !isNoteVisible(note, selectedFilters),
      isLatest:
        Date.parse(note.createdAt) >
        getDateCutoff(selectedFilters.until ?? Date.now()),
    }
  })
}

export { buildNotesViewModel, getNoteDisplayColor }