import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"
import { formatDate } from "../../utils/dates"

beforeAll(() => {
  vi.stubEnv("TZ", "UTC")
})

afterAll(() => {
  vi.unstubAllEnvs()
})

describe("formatDate", () => {
  it("formats a date string using en-US locale options", () => {
    const spy = vi.spyOn(Date.prototype, "toLocaleDateString")
    const formattedDate = formatDate("2024-06-15T14:30:00.000Z")

    expect(spy).toHaveBeenCalledWith("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })

    expect(formattedDate).toBe("June 15 at 2:30 PM")

    spy.mockRestore()
  })

  it("formats a Date object", () => {
    const spy = vi.spyOn(Date.prototype, "toLocaleDateString")
    const date = new Date("2024-06-15T14:30:00.000Z")

    const formattedDate = formatDate(date)

    expect(spy).toHaveBeenCalledWith("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })

    expect(formattedDate).toBe("June 15 at 2:30 PM")

    spy.mockRestore()
  })
})
