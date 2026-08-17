import { describe, expect, it } from "vitest"
import type { Note, NoteFilter } from "../../types/index.js"
import { getAvailableFilters, isNoteFiltered } from "../../utils/filter.js"

const createNote = (overrides: Partial<Note> = {}): Note => ({
  id: "1",
  createdAt: "2024-03-15T09:28:03.000Z",
  text: "test note",
  x: 0,
  y: 0,
  author: "alice",
  color: "pink",
  ...overrides,
})

describe("isNoteFiltered", () => {
  it("returns true when no filters are applied", () => {
    expect(isNoteFiltered(createNote(), {})).toBe(true)
  })

  it("filters by author", () => {
    const note = createNote({ author: "alice" })
    const filter: NoteFilter = { author: ["bob"] }

    expect(isNoteFiltered(note, filter)).toBe(false)
    expect(isNoteFiltered(note, { author: ["alice"] })).toBe(true)
  })

  it("filters by color", () => {
    const note = createNote({ color: "pink" })

    expect(isNoteFiltered(note, { color: ["blue"] })).toBe(false)
    expect(isNoteFiltered(note, { color: ["pink"] })).toBe(true)
  })

  it("filters by until timestamp", () => {
    const note = createNote({ createdAt: "2024-03-15T09:30:00.000Z" })
    const until = Date.parse("2024-03-15T09:29:00.000Z")

    expect(isNoteFiltered(note, { until })).toBe(false)
    expect(isNoteFiltered(note, { until: Date.parse("2024-03-15T09:31:00.000Z") })).toBe(true)
  })
})

describe("getAvailableFilters", () => {
  it("returns sorted unique authors and colors with time range", () => {
    const notes: Note[] = [
      createNote({
        id: "1",
        author: "bob",
        color: "blue",
        createdAt: "2024-03-15T09:30:00.000Z",
      }),
      createNote({
        id: "2",
        author: "alice",
        color: "pink",
        createdAt: "2024-03-15T09:28:03.000Z",
      }),
      createNote({
        id: "3",
        author: "alice",
        color: "pink",
        createdAt: "2024-03-15T09:35:00.000Z",
      }),
    ]

    expect(getAvailableFilters(notes)).toEqual({
      author: ["alice", "bob"],
      color: ["blue", "pink"],
      until: {
        start: Date.parse("2024-03-15T09:28:03.000Z"),
        end: Date.parse("2024-03-15T09:35:00.000Z"),
      },
    })
  })
})
