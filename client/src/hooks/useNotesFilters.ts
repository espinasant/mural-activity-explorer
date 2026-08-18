import type {
  NotesFiltersOptions,
  AvailableFilters,
  NoteFilter,
} from "@/types/filter"
import {
  parseFiltersFromUrl,
  buildFiltersUrl,
  buildFiltersObject,
} from "@/utils/filters"
import { useEffect, useMemo, useState } from "react"

interface UseNotesFiltersProps {
  availableFilters: AvailableFilters | undefined
}

interface UseNotesFiltersReturn {
  selectedFilters: NoteFilter
  filters: NotesFiltersOptions
  setFilter: (
    filter: keyof NotesFiltersOptions,
    value: string,
    isEnabled: boolean
  ) => void
  clearFilters: () => void
}

const useNotesFilters = ({
  availableFilters,
}: UseNotesFiltersProps): UseNotesFiltersReturn => {
  const [filters, setFilters] = useState<NotesFiltersOptions>({
    author: [],
    color: [],
    until: availableFilters?.until.end ?? 0,
  })

  const selectedFilters = useMemo(() => {
    return {
      author: filters.author
        .filter((item) => item.isEnabled)
        .map((item) => item.value),
      color: filters.color
        .filter((item) => item.isEnabled)
        .map((item) => item.value),
      until: filters.until,
    } satisfies NoteFilter
  }, [filters])

  useEffect(() => {
    const selectedFilters = parseFiltersFromUrl(window.location.href)
    const filters = buildFiltersObject(
      selectedFilters,
      availableFilters ?? { author: [], color: [], until: { start: 0, end: 0 } }
    )
    setFilters(filters)
  }, [availableFilters])

  const setFilter = (
    filter: keyof NotesFiltersOptions,
    value: string,
    isEnabled: boolean
  ) => {
    let newFilters
    if (filter === "until") {
      newFilters = {
        ...filters,
        until: parseInt(value) as number,
      } satisfies NotesFiltersOptions
    } else {
      newFilters = {
        ...filters,
        [filter]: filters[filter].map((item) =>
          item.value === value ? { ...item, isEnabled } : item
        ),
      } satisfies NotesFiltersOptions
    }
    setFilters(newFilters)
    window.history.pushState(null, "", buildFiltersUrl(newFilters))
  }

  const clearFilters = () => {
    const newFilters = {
      author: filters.author.map((item) => ({ ...item, isEnabled: false })),
      color: filters.color.map((item) => ({ ...item, isEnabled: false })),
      until: availableFilters?.until?.end ?? 0,
    } satisfies NotesFiltersOptions
    setFilters(newFilters)
    window.history.pushState(null, "", buildFiltersUrl(newFilters))
  }

  return {
    selectedFilters,
    filters,
    setFilter,
    clearFilters,
  }
}

export default useNotesFilters
