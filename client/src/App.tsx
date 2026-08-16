import NotesBoard from "@/components/NotesBoard/NotesBoard"
import NotesFilters from "@/components/NotesFilters/NotesFilters"
import { useMemo } from "react"
import { fetchNotes, fetchNotesStats } from "@/api/notes"
import { useQuery, useTimelineScrub, useNotesFilters } from "@/hooks"
import type { NotesResponse, NotesStatsResponse } from "@/types/notes"

export function App() {
  const {
    data: notesData,
    error: notesError,
    isLoading: isNotesLoading,
  } = useQuery<NotesResponse>(fetchNotes)
  const {
    data: statsData,
    error: statsError,
    isLoading: isStatsLoading,
  } = useQuery<NotesStatsResponse>(fetchNotesStats)
  const { selectedFilters, filters, setFilter, clearFilters } = useNotesFilters(
    { availableFilters: notesData?.filters }
  )
  const { previewUntil, handleScrub, clearPreview } = useTimelineScrub()

  const isLoading = isNotesLoading || isStatsLoading
  const isError = notesError || statsError

  const viewFilters = useMemo(
    () => ({
      ...selectedFilters,
      until: previewUntil ?? selectedFilters.until,
    }),
    [selectedFilters, previewUntil]
  )

  const handleUntilCommit = (value: number) => {
    clearPreview()
    setFilter("until", value.toString(), true)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Error: {notesError?.message || statsError?.message}
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen justify-center overflow-hidden">
      <NotesBoard
        availableFilters={notesData?.filters ?? null}
        notes={notesData?.notes ?? []}
        selectedFilters={viewFilters}
      />
      <NotesFilters
        stats={statsData}
        availableFilters={notesData?.filters}
        filters={{
          ...filters,
          until: viewFilters.until ?? filters.until,
        }}
        onFilterChange={setFilter}
        onClearFilters={clearFilters}
        onSliderDrag={handleScrub}
        onSliderCommit={handleUntilCommit}
      />
    </div>
  )
}

export default App
