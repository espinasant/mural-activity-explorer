import { describe, expect, it } from "vitest"
import type { AvailableFilters, NoteFilter } from "../../types/filter"
import type { Note } from "../../types/notes"
import {
  buildFiltersObject,
  buildFiltersUrl,
  isNoteVisible,
  parseFiltersFromUrl,
} from "../../utils/filters"

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

const availableFilters: AvailableFilters = {
  author: ["alice", "bob"],
  color: ["pink", "blue"],
  until: {
    start: 1_710_000_000_000,
    end: 1_710_010_000_000,
  },
}

describe("parseFiltersFromUrl", () => {
  it("returns empty filters when url has no search params", () => {
    expect(parseFiltersFromUrl("http://localhost/notes")).toEqual({
      author: [],
      color: [],
      until: undefined,
    })
  })

  it("parses author, color, and until from url", () => {
    expect(
      parseFiltersFromUrl(
        "http://localhost/notes?author=alice&author=bob&color=pink&until=1234567890"
      )
    ).toEqual({
      author: ["alice", "bob"],
      color: ["pink"],
      until: 1234567890,
    })
  })
})

describe("buildFiltersUrl", () => {
  it("returns / when no filters are enabled", () => {
    expect(
      buildFiltersUrl({
        author: [{ value: "alice", label: "alice", isEnabled: false }],
        color: [{ value: "pink", label: "pink", isEnabled: false }],
        until: 0,
      })
    ).toBe("/")
  })

  it("builds query string from enabled filters", () => {
    const url = buildFiltersUrl({
      author: [{ value: "alice", label: "alice", isEnabled: true }],
      color: [{ value: "pink", label: "pink", isEnabled: true }],
      until: 1234567890,
    })

    expect(url).toBe("?author=alice&color=pink&until=1234567890")
  })
})

describe("buildFiltersObject", () => {
  it("maps available filters and marks selected values as enabled", () => {
    const filters: NoteFilter = {
      author: ["alice"],
      color: ["blue"],
      until: 1_710_005_000_000,
    }

    expect(buildFiltersObject(filters, availableFilters)).toEqual({
      author: [
        { value: "alice", label: "alice", isEnabled: true },
        { value: "bob", label: "bob", isEnabled: false },
      ],
      color: [
        { value: "pink", label: "pink", isEnabled: false },
        { value: "blue", label: "blue", isEnabled: true },
      ],
      until: 1_710_005_000_000,
    })
  })

  it("falls back to available until end when until is undefined", () => {
    const filters: NoteFilter = {
      author: [],
      color: [],
    }

    expect(buildFiltersObject(filters, availableFilters).until).toBe(
      availableFilters.until.end
    )
  })
})

describe("isNoteVisible", () => {
  it("returns true when no filters are selected", () => {
    expect(
      isNoteVisible(createNote(), { author: [], color: [], until: undefined })
    ).toBe(true)
  })

  it("filters by author", () => {
    const note = createNote({ author: "alice" })

    expect(
      isNoteVisible(note, { author: ["bob"], color: [], until: undefined })
    ).toBe(false)
    expect(
      isNoteVisible(note, { author: ["alice"], color: [], until: undefined })
    ).toBe(true)
  })

  it("filters by color", () => {
    const note = createNote({ color: "pink" })

    expect(
      isNoteVisible(note, { author: [], color: ["blue"], until: undefined })
    ).toBe(false)
  })

  it("filters by until timestamp", () => {
    const note = createNote({ createdAt: "2024-03-15T09:30:00.000Z" })
    const until = Date.parse("2024-03-15T09:29:00.000Z")

    expect(
      isNoteVisible(note, { author: [], color: [], until })
    ).toBe(false)
    expect(
      isNoteVisible(note, { author: [], color: [], until: undefined })
    ).toBe(true)
  })
})
