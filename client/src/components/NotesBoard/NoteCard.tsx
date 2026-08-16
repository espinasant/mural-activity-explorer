import type { NoteViewModel } from "@/types/notes"
import { cn } from "@/utils/classes"
import { formatDate } from "@/utils/dates"
import { getNoteDisplayColor } from "@/utils/notes"
import { forwardRef } from "react"

interface NoteCardProps {
  note: NoteViewModel
}

const NoteCard = forwardRef<HTMLLIElement, NoteCardProps>(({ note }, ref) => {
  const { createdAt, text, author, x, y, color, isHidden, isLatest } = note
  const displayColor = getNoteDisplayColor(color)
  return (
    <li
      ref={ref}
      className={cn(
        "absolute flex w-40 cursor-pointer flex-col gap-2 rounded-md p-3 shadow-lg transition-opacity duration-300 data-[hidden=true]:pointer-events-none data-[hidden=true]:opacity-0",
        {
          "shadow-lg border-2 border-green-300 shadow-green-400": isLatest,
        }
      )}
      data-hidden={isHidden || undefined}
      style={{ top: y, left: x, backgroundColor: displayColor }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-700">
          {formatDate(new Date(createdAt))}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">{text}</p>
        <p className="text-xs text-gray-700">{author}</p>
      </div>
    </li>
  )
})

export default NoteCard
