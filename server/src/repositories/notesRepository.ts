import { readFileSync } from "fs";
import { NoteFilter, Note, AvailableFilters, NotesStats } from "../types";
import { resolve } from "path";
import { getAvailableFilters, isNoteFiltered } from "../utils/filter";
import Logger from "../utils/logger";
import { getNotesStats } from "../utils/stats";

const DB_PATH = "src/db/notes.json";

const getNotesDB = () => {
  try {
    const path = resolve(DB_PATH);
    Logger.debug(`Notes DB path: ${path}`);
    const db: Note[] = JSON.parse(readFileSync(path, "utf-8"));
    return db;
  } catch (error) {
    Logger.error((error as Error).message);
    return [];
  }
};

const aggregateNotesStats = async (): Promise<NotesStats> => {
  const notesDB = getNotesDB();
  if (!notesDB || !notesDB?.length) {
    return { totalNotes: 0, notesByAuthor: {}, notesByColor: {} };
  }
  return getNotesStats(notesDB);
};

const findNotes = async (filter?: NoteFilter): Promise<Note[]> => {
  const notesDB = getNotesDB();
  if (!notesDB || !notesDB?.length) {
    return [];
  }
  if (!filter) {
    return notesDB;
  }
  const filteredNotes = notesDB.filter((note) => isNoteFiltered(note, filter));
  const sortedNotes = filteredNotes.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
  return sortedNotes;
};

const findAvailableFilters = async (): Promise<AvailableFilters> => {
  const notesDB = getNotesDB();
  if (!notesDB || !notesDB?.length) {
    return { author: [], color: [], until: { start: 0, end: 0 } };
  }
  return getAvailableFilters(notesDB);
};

export { findNotes, findAvailableFilters, aggregateNotesStats };
