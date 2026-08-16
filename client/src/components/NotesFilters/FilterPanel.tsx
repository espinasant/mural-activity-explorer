import type {
  FilterItem as FilterItemType,
  NotesFiltersOptions,
} from "@/types/filter"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Checkbox } from "../ui/checkbox"
import { PaletteIcon, UserIcon } from "lucide-react"
import type { NotesStatsResponse } from "@/types/notes"
import { getNoteDisplayColor } from "@/utils/notes"
import { cn } from "@/utils/classes"
import { Button } from "../ui/button"

type TriggerComponent = React.ReactNode
type OnFilterChange = (
  filter: keyof NotesFiltersOptions,
  value: string,
  isEnabled: boolean
) => void

interface FilterPanelProps {
  trigger: TriggerComponent
  filters: NotesFiltersOptions
  onFilterChange: OnFilterChange
  onClearFilters: () => void
  stats?: NotesStatsResponse | null
}

interface FilterGroupProps {
  filterKey: keyof NotesFiltersOptions
  filters: FilterItemType[]
  title: string
  icon: React.ReactNode
  itemLabel?: (value: string) => React.ReactNode
  onFilterChange: OnFilterChange
  stats?: Record<string, number>
  listClassName?: string
}

interface FilterItemProps {
  item: FilterItemType
  filter: keyof NotesFiltersOptions
  label?: (value: string) => React.ReactNode
  onFilterChange: OnFilterChange
  stats?: number
}

const FilterItem: React.FC<FilterItemProps> = ({
  item,
  filter,
  label,
  onFilterChange,
  stats,
}) => {
  return (
    <div
      onClick={() => onFilterChange(filter, item.value, !item.isEnabled)}
      className="flex cursor-pointer items-center gap-2"
    >
      <Checkbox
        checked={item.isEnabled}
        onCheckedChange={(checked) =>
          onFilterChange(filter, item.value, checked)
        }
      />
      <div className="flex items-center gap-2">
        {label ? (
          label(item.value)
        ) : (
          <p className="w-20 text-sm font-medium">{item.label}</p>
        )}
        <p className="text-sm text-gray-500">{stats}</p>
      </div>
    </div>
  )
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  icon,
  title,
  filterKey,
  filters,
  listClassName,
  onFilterChange,
  itemLabel,
  stats,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <ul className={cn("flex max-h-40 flex-col flex-wrap gap-2", listClassName)}>
        {filters.map((filter) => (
          <li className="flex items-center gap-2" key={filter.value}>
            <FilterItem
              item={filter}
              filter={filterKey}
              label={itemLabel}
              stats={stats?.[filter.value] ?? 0}
              onFilterChange={onFilterChange}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  trigger,
  filters,
  stats,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="w-auto" side="top">
        <div className="flex flex-col gap-4 p-1">
          <FilterGroup
            filterKey="author"
            title="Author"
            icon={<UserIcon className="size-4" />}
            filters={filters.author}
            onFilterChange={onFilterChange}
            stats={stats?.notesByAuthor ?? {}}
          />
          <FilterGroup
            filterKey="color"
            title="Color"
            listClassName="max-h-20"
            icon={<PaletteIcon className="size-4" />}
            filters={filters.color}
            itemLabel={(value) => (
              <div className="flex items-center gap-2">
                <p className="w-12 text-sm font-medium">{value}</p>
                <div
                  className="h-4 w-4 rounded-sm"
                  style={{ backgroundColor: getNoteDisplayColor(value) }}
                />
              </div>
            )}
            onFilterChange={onFilterChange}
            stats={stats?.notesByColor ?? {}}
          />
          <Button variant="secondary" onClick={onClearFilters}>
            Clear Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FilterPanel
