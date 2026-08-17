import { describe, expect, it } from "vitest"
import type { Note } from "../../types/index.js"
import { getNotesStats } from "../../utils/stats.js"

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

describe("getNotesStats", () => {
  it("returns zero counts for an empty list", () => {
    expect(getNotesStats([])).toEqual({
      totalNotes: 0,
      notesByAuthor: {},
      notesByColor: {},
    })
  })

  it("aggregates notes by author and color", () => {
    const notes: Note[] = [
      createNote({ id: "1", author: "alice", color: "pink" }),
      createNote({ id: "2", author: "bob", color: "blue" }),
      createNote({ id: "3", author: "alice", color: "pink" }),
      createNote({ id: "4", author: "bob", color: "blue" }),
      createNote({ id: "5", author: "bob", color: "yellow" }),
    ]

    expect(getNotesStats(notes)).toEqual({
      totalNotes: 5,
      notesByAuthor: {
        alice: 2,
        bob: 3,
      },
      notesByColor: {
        pink: 2,
        blue: 2,
        yellow: 1,
      },
    })
  })
})
