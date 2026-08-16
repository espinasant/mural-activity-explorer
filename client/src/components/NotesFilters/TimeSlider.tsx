import type { TimeRange } from "@/types/filter"
import { formatDate } from "@/utils/dates"
import { Slider } from "../ui/slider"

interface TimeSliderProps {
  value?: number
  range?: TimeRange
  onSliderDrag: (value: number) => void
  onSliderCommit: (value: number) => void
}

const TimeSlider = ({
  value,
  range,
  onSliderDrag,
  onSliderCommit,
}: TimeSliderProps) => {
  if (!range) {
    return null
  }

  const onValueChange = (value: number | readonly number[]) => {
    onSliderDrag(value as number)
  }

  const onValueCommitted = (value: number | readonly number[]) => {
    onSliderCommit(value as number)
  }

  return (
    <div className="w-full">
      <Slider
        formatTooltip={(ms) => formatDate(new Date(ms))}
        value={[value ?? range.end]}
        onValueChange={onValueChange}
        onValueCommitted={onValueCommitted}
        min={range.start}
        max={range.end}
        aria-label="Time slider"
      />
    </div>
  )
}

export default TimeSlider
