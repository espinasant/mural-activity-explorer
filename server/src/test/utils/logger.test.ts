import { afterEach, describe, expect, it, vi } from "vitest"
import Logger from "../../utils/logger.js"

describe("Logger", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("logs errors with a timestamp prefix", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})

    Logger.error("something went wrong")

    expect(errorSpy).toHaveBeenCalledOnce()
    expect(errorSpy.mock.calls[0]?.[0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] something went wrong$/
    )
  })

  it("logs warnings with a timestamp prefix", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    Logger.warn("careful")

    expect(warnSpy).toHaveBeenCalledOnce()
    expect(warnSpy.mock.calls[0]?.[0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] careful$/
    )
  })

  it("logs info with a timestamp prefix", () => {
    const infoSpy = vi.spyOn(console, "log").mockImplementation(() => {})

    Logger.info("ready")

    expect(infoSpy).toHaveBeenCalledOnce()
    expect(infoSpy.mock.calls[0]?.[0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] ready$/
    )
  })

  it("logs debug with a timestamp prefix", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {})

    Logger.debug("details")

    expect(debugSpy).toHaveBeenCalledOnce()
    expect(debugSpy.mock.calls[0]?.[0]).toMatch(
      /^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] details$/
    )
  })
})
