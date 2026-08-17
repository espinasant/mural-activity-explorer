import type { AvailableFilters, NotesFiltersOptions } from "@/types/filter"
import { Button } from "@/components/ui/button"
import { FilterIcon } from "lucide-react"
import FilterPanel from "./FilterPanel"
import TimeSlider from "./TimeSlider"
import type { NotesStatsResponse } from "@/types/notes"

interface NotesFiltersProps {
  stats: NotesStatsResponse | null
  onFilterChange: (
    filter: keyof NotesFiltersOptions,
    value: string,
    isEnabled: boolean
  ) => void
  filters: NotesFiltersOptions
  onClearFilters: () => void
  availableFilters?: AvailableFilters
  onSliderDrag: (value: number) => void
  onSliderCommit: (value: number) => void
}

const NotesFilters: React.FC<NotesFiltersProps> = ({
  stats,
  onFilterChange,
  filters,
  availableFilters,
  onSliderDrag,
  onSliderCommit,
  onClearFilters,
}) => {
  return (
    <div className="fixed bottom-20 flex w-full max-w-[50%] items-center justify-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-lg">
      <FilterPanel
        trigger={
          <Button variant="secondary">
            <FilterIcon />
          </Button>
        }
        filters={filters}
        stats={stats}
        onFilterChange={onFilterChange}
        onClearFilters={onClearFilters}
      />
      <TimeSlider
        value={filters.until}
        range={availableFilters?.until}
        onSliderDrag={onSliderDrag}
        onSliderCommit={onSliderCommit}
      />
    </div>
  )
}

export default NotesFilters
