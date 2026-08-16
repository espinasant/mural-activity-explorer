import { Note, NotesStats } from "../types";

const getNotesStats = (notes: Note[]): NotesStats => {
  return {
    totalNotes: notes.length,
    notesByAuthor: notes.reduce((acc, note) => {
      acc[note.author] = (acc[note.author] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    notesByColor: notes.reduce((acc, note) => {
      acc[note.color] = (acc[note.color] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
};

export { getNotesStats };