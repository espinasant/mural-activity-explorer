import { describe, expect, it, vi } from "vitest"
import Logger from "../../utils/logger.js"
import { isValidDate, parseArray, parseDate } from "../../utils/validation.js"

describe("isValidDate", () => {
  it("returns true for numeric strings", () => {
    expect(isValidDate("1234567890")).toBe(true)
  })

  it("returns true for numbers", () => {
    expect(isValidDate(1234567890)).toBe(true)
  })

  it("returns false for non-numeric values", () => {
    expect(isValidDate("not-a-date")).toBe(false)
  })
})

describe("parseArray", () => {
  it("returns an empty array for undefined", () => {
    expect(parseArray(undefined)).toEqual([])
  })

  it("wraps a single string in an array", () => {
    expect(parseArray("alice")).toEqual(["alice"])
  })

  it("returns arrays unchanged", () => {
    expect(parseArray(["alice", "bob"])).toEqual(["alice", "bob"])
  })
})

describe("parseDate", () => {
  it("returns undefined when date is missing", () => {
    expect(parseDate(undefined)).toBeUndefined()
  })

  it("returns a numeric timestamp when date passes validation", () => {
    const result = parseDate("0")

    expect(typeof result).toBe("number")
    expect(Number.isNaN(result)).toBe(false)
    expect(result).toBe(new Date("0").getTime())
  })

  it("returns undefined and logs a warning for invalid dates", () => {
    const warnSpy = vi.spyOn(Logger, "warn").mockImplementation(() => {})

    expect(parseDate("invalid-date")).toBeUndefined()
    expect(warnSpy).toHaveBeenCalledWith("Invalid filter date: invalid-date")

    warnSpy.mockRestore()
  })
})
