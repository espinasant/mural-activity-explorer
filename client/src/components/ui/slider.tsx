import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "@/utils/classes"

type SliderProps = SliderPrimitive.Root.Props & {
  formatTooltip?: (value: number) => string
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  formatTooltip,
  ...props
}: SliderProps) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-[5px] border border-gray-200 bg-gray-100 select-none data-horizontal:h-3 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-gray-300 select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            index={index}
            className="relative block h-5 w-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
          >
            {formatTooltip && (
              <SliderPrimitive.Value className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 rounded-md bg-neutral-50 border border-neutral-200 shadow-sm px-2 py-1 text-xs font-medium whitespace-nowrap text-black opacity-0 transition-opacity data-dragging:opacity-100">
                {(_formattedValues, values) => {
                  return formatTooltip(values[index])
                }}
              </SliderPrimitive.Value>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
