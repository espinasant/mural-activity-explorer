import type { AvailableFilters, Note, NoteFilter } from "../types/index.js";

const isNoteFiltered = (note: Note, filter: NoteFilter) => {
  const { author, color, until } = filter || {};
  if (!!author?.length && !author.includes(note.author)) {
    return false;
  }
  if (!!color?.length && !color.includes(note.color)) {
    return false;
  }
  if (!!until && Date.parse(note.createdAt) >= until) {
    return false;
  }
  return true;
};

const getAvailableFilters = (notes: Note[]): AvailableFilters => {
  const authors = new Set();
  const colors = new Set();
  const until = new Set<number>();
  for (const note of notes) {
    authors.add(note.author);
    colors.add(note.color);
    until.add(new Date(note.createdAt).getTime());
  }

  const start = Math.min(...until.values());
  const end = Math.max(...until.values());

  return {
    author: Array.from(authors.values()) as string[],
    color: Array.from(colors.values()) as string[],
    until: {
      start,
      end,
    },
  };
};

export { isNoteFiltered, getAvailableFilters};
