import { useCallback, useRef, useState } from "react"

/**
 * Holds a transient `until` value while the timeline slider is being dragged.
 * React visibility derives from this preview; committed `until` lives in useNotesFilters.
 */
const useTimelineScrub = () => {
  const [previewUntil, setPreviewUntil] = useState<number | null>(null)
  const rafId = useRef<number | null>(null)
  const pendingUntil = useRef<number | null>(null)

  const handleScrub = useCallback((value: number) => {
    pendingUntil.current = value

    if (rafId.current !== null) {
      return
    }

    rafId.current = requestAnimationFrame(() => {
      if (pendingUntil.current !== null) {
        setPreviewUntil(pendingUntil.current)
      }
      rafId.current = null
    })
  }, [])

  const clearPreview = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    pendingUntil.current = null
    setPreviewUntil(null)
  }, [])

  return {
    previewUntil,
    handleScrub,
    clearPreview,
  }
}

export default useTimelineScrub
