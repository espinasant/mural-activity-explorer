import type { NoteFilter } from "@/types/filter"
import type { NotesResponse, NotesStatsResponse } from "@/types/notes"
import { callApi } from "."

const getFilterQueryParams = (filter?: NoteFilter): string => {
  if (!filter) {
    return ""
  }
  const params = new URLSearchParams()
  for (const key in filter) {
    const curr = filter[key as keyof typeof filter]
    if (Array.isArray(curr)) {
      for (const value of curr) {
        params.append(key, String(value))
      }
    } else {
      params.append(key, String(curr))
    }
  }
  return params.toString()
}

const fetchNotes = async (filter?: NoteFilter) => {
  const queryParams = getFilterQueryParams(filter)
  const response = await callApi<NotesResponse>(`/notes${queryParams}`, {
    method: "GET",
  })
  return response;
}

const fetchNotesStats = async () => {
  const response = await callApi<NotesStatsResponse>("/notes/stats", {
    method: "GET",
  })
  return response;
}

export { fetchNotes, fetchNotesStats }
