import type { NotesFiltersOptions } from "@/types/filter";
import type { AvailableFilters, NoteFilter } from "@/types/filter";
import type { Note as NoteType } from "@/types/notes";

const parseFiltersFromUrl = (url: string): NoteFilter => {
  const searchParams = new URL(url).searchParams;
  if (searchParams.size === 0) {
    return {
      author: [],
      color: [],
      until: undefined,
    }
  }
  const filters: NoteFilter = {
    author: searchParams.getAll("author"),
    color: searchParams.getAll("color"),
    until: searchParams.get("until") ? parseInt(searchParams.get("until") || "") : undefined,
  } 
  return filters;
}

const buildFiltersUrl = (filters: NotesFiltersOptions): string => {
  const searchParams = new URLSearchParams();
  filters.author.forEach((item) => item.isEnabled && searchParams.append("author", item.value));
  filters.color.forEach((item) => item.isEnabled && searchParams.append("color", item.value));
  if (filters.until) {
    searchParams.append("until", filters.until.toString());
  }
  return searchParams.size > 0 ? `?${searchParams.toString()}` : "/";
}

const buildFiltersObject = (filters: NoteFilter, availableFilters: AvailableFilters): NotesFiltersOptions => {
  const filtersObject: NotesFiltersOptions = {
    author: availableFilters.author.map((author) => ({
      value: author,
      label: author,
      isEnabled: filters.author.includes(author),
    })),
    color: availableFilters.color.map((color) => ({
      value: color,
      label: color,
      isEnabled: filters.color.includes(color),
    })),
    until: filters.until ?? availableFilters.until.end,
  } satisfies NotesFiltersOptions;
  return filtersObject;
}

const isNoteVisible = (
  note: NoteType,
  selectedFilters: NoteFilter
): boolean => {
  return Object.entries(selectedFilters).every(([filter, value]) => {
    if (filter === "until") {
      return value === undefined || Date.parse(note.createdAt) < value
    }
    return !value.length || value.includes(note[filter as keyof NoteType])
  })
}

export { parseFiltersFromUrl, buildFiltersUrl, buildFiltersObject, isNoteVisible }