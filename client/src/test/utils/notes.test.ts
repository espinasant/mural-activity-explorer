import { describe, expect, it, vi } from "vitest"
import type { AvailableFilters, NoteFilter } from "../../types/filter"
import type { Note } from "../../types/notes"
import { buildNotesViewModel, getNoteDisplayColor } from "../../utils/notes"

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

describe("getNoteDisplayColor", () => {
  it.each([
    ["pink", "#ffbdd6"],
    ["green", "#b5eaa7"],
    ["blue", "#acccff"],
    ["yellow", "#fdff98"],
    ["purple", "#d0b5ff"],
    ["orange", "#ffc080"],
  ] as const)("returns %s hex color", (color, expected) => {
    expect(getNoteDisplayColor(color)).toBe(expected)
  })

  it("returns undefined for unknown colors", () => {
    expect(getNoteDisplayColor("red")).toBeUndefined()
  })
})

describe("buildNotesViewModel", () => {
  const availableFilters: AvailableFilters = {
    author: ["alice"],
    color: ["pink"],
    until: {
      start: Date.parse("2024-03-15T09:28:03.000Z"),
      end: Date.parse("2024-03-15T09:40:00.000Z"),
    },
  }

  it("marks notes hidden when they do not match selected filters", () => {
    const notes = [createNote({ author: "alice" })]
    const selectedFilters: NoteFilter = {
      author: ["bob"],
      color: [],
      until: undefined,
    }

    const result = buildNotesViewModel(notes, selectedFilters, availableFilters)

    expect(result[0]?.isHidden).toBe(true)
  })

  it("marks recent notes as latest based on available until end", () => {
    const notes = [
      createNote({
        id: "recent",
        createdAt: "2024-03-15T09:39:45.000Z",
      }),
      createNote({
        id: "old",
        createdAt: "2024-03-15T09:20:00.000Z",
      }),
    ]

    const result = buildNotesViewModel(
      notes,
      { author: [], color: [], until: undefined },
      availableFilters
    )

    expect(result.find((note) => note.id === "recent")?.isLatest).toBe(true)
    expect(result.find((note) => note.id === "old")?.isLatest).toBe(false)
  })

  it("uses current time as cutoff when available filters are null", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2024-03-15T09:59:00.000Z"))

    const notes = [
      createNote({
        createdAt: "2024-03-15T09:59:30.000Z",
      }),
    ]

    const result = buildNotesViewModel(
      notes,
      { author: [], color: [], until: undefined },
      null
    )

    expect(result[0]?.isLatest).toBe(true)

    vi.useRealTimers()
  })
})
