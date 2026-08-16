import { findNotes, findAvailableFilters, aggregateNotesStats } from "../repositories/notesRepository";
import { AvailableFilters, Note, NoteFilter, NotesStats } from "../types";

interface NotesWithFilters {
  notes: Note[];
  filters: AvailableFilters;
}

const getNotesWithFilters = async (
  filter?: NoteFilter,
): Promise<NotesWithFilters> => {
  const notes = await findNotes(filter);
  const availableFilters = await findAvailableFilters();
  return {
    notes: notes,
    filters: availableFilters,
  };
};

const getNotesStats = async (): Promise<NotesStats> => {
  const stats = await aggregateNotesStats();
  return stats;
};

export { getNotesWithFilters, getNotesStats };
