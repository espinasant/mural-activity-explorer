import { describe, expect, it } from "vitest"
import { cn } from "../../utils/classes"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("handles conditional classes", () => {
    expect(cn("base", {"hidden": false}, "visible")).toBe("base visible")
  })

  it("resolves conflicting tailwind utilities", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })
})
