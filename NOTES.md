# Write-up — Collaborative Board Activity Explorer

**Time spent:** ~5 hours

---

## How I approached the challenge and scoped the work

I started by reframing the problem: this is a **post-session activity explorer**, not a live collaborative editor. The core question is *"what happened on this board, and who contributed what?"*.

Given the ~4-hour guidance, I prioritized a small set of features that I considered the most useful for users:

1. **Load and render** sticky notes at their original board coordinates
2. **Pan and zoom** so users can easily navigate the canvas
3. **Filter** by author and color
4. **Scrub a timeline** to see how the board evolved over time
5. **Show stats** (notes per author / color)

Implementation order was backend-first (data + API contract), then the board viewport, then filters and timeline. Tests were added on each step of the work. 

---



## Assumptions

- **Timestamps:** The provided schema in the challenge's description had no `createdAt` field, so I added one to enable timeline filtering. All notes in the dataset include it.
- **Single board:** One static JSON file, one board per app instance, no multi-board routing or user accounts.
- **Dataset size:** According to description, the app was architected to handle comfortably dozens to hundreds notes per board.  This amount fits comfortably in memory and client-side filtering is fast enough for this scale.
- **Global stats:** The stats panel reflects the **full board**, not the currently filtered view. Filters are a lens on the canvas only.
- **No auth or persistence:** Read-only exploration of a preloaded dataset.

---



## Architectural overview and decisions



### High-level layout

```
React client                          NodeJS Service
┌─────────────────────────┐          ┌──────────────────────┐
│ NotesBoard (pan/zoom)   │  HTTP    │ GET /notes           │
│ NotesFilters (bottom)   │ ───────► │ GET /notes/stats     │
└─────────────────────────┘          └──────────────────────┘
```



### Backend

- **Stack:** Node.js + Express + TypeScript
- **Layered Architecture:** `routes → services → repository` keeps HTTP concerns separate from data access and makes the repository layer easy to swap (JSON file today, DB tomorrow).
- `GET /notes` returns the full note list plus filter metadata (`authors`, `colors`, time range). Query params (`author`, `color`, `until`) are parsed and supported server-side, ready for when boards outgrow client-side filtering.
- `GET /notes/stats` is a separate endpoint for aggregates — intentional separation so stats can be cached or computed independently as the system grows.



### Frontend

- **Stack:** React + TypeScript + Vite, Tailwind for styling, shadcn/ui for filter controls.
- **Data fetching:** A lightweight custom`useQuery` hook facilitates fetches for notes and stats on mount.
- **Hybrid filtering model:**
  - Backend owns the data and filter metadata.
  - URL query params (`?author=&color=&until=`) are the source of truth for the active view — enabling shareable filtered states without sessions.
  - Client caches the full dataset and applies filters in memory for instant toggling.
- **Rendering:** HTML elements with absolute positioning (`x`, `y`) rather than Canvas since it was simpler to build, naturally supports hover/click/accessibility, and performs well with this amount of elements. Used `react-zoom-pan-pinch` for pan/zoom instead of rolling a custom viewport hook since it's battle-tested and fast to implement.
- **Timeline performance:** While dragging the slider, a transient `previewUntil` state (rAF-throttled) drives visibility without updating the URL. On release, the value commits to URL state via `pushState`. Notes fade via CSS opacity rather than mount/unmount which makes it more performant.

---



## UX decisions

- **Bottom-anchored control bar** — filters and timeline sit in a fixed bar at the bottom so the board stays unobstructed. The filter panel opens upward in a popover to avoid covering notes.
- **Inline stats in filters** — each author/color checkbox shows its note count from the stats endpoint, so users can see distribution before filtering.
- **Color swatches** — filter options for note colors include a visual swatch, not just a label.
- **Smooth timeline scrubbing** — notes fade out with a CSS transition as the cutoff moves; no jarring pop-in/out during drag.
- **Pan/zoom defaults** — board starts at 80% scale with grab cursor; bounds derived from note positions so users can't pan into empty space indefinitely.
- **Shareable URL** — Filters and timeline are URL query params, so users can share and bookmark specific views with collaborators.
- **URL as undo** — filter changes push history entries (back button restores prior view); timeline commits do the same on slider release.

---



## If you used AI, how you used it

Yes, I used **Cursor** throughout the project to assist in following items:

- **Scoping and architecture:** Helped brainstorming the hybrid filtering model and certain client app architecture decisions before writing code.
- **Scaffolding:** Generating server and client boilerplate, React component shells, and shadcn/ui setup.
- **Unit tests:** Drafting Vitest suites for server utils (`filter`, `stats`, `validation`) and client utils (`filters`, `notes`, `dates`).

AI accelerated boilerplate and exploration but all architectural decisions, tradeoffs, and final code were reviewed and adjusted manually. I treated AI output as a starting point, not a finished product.

---



## Tradeoffs & next steps



### Tradeoffs


| Decision                              | Why                                                   | Cost                                                                                        |
| ------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Client-side filtering                 | Instant UX for hundreds of notes; URL still shareable | Won't scale to 10k+ notes without server-side filtering and pagination                      |
| Global stats (not filter-scoped)      | Simpler API and UI for the time box                   | Stats don't update when filters change which can feel inconsistent                          |
| Bottom bar vs sidebar                 | Keeps canvas maximized                                | Less room for rich filter or analytics panels                                               |
| React-based approach for timeline     | Simple, readable; good enough at this scale           | Less performant than imperative DOM updates or binary-search delta toggling at very large N |
| `react-zoom-pan-pinch` vs custom hook | Faster to ship                                        | Less control over zoom-to-cursor behavior                                                   |




### Next steps (with more time)

1. **Server-side filtering + pagination** — wire existing query params on `GET /notes` for large boards; add cursor-based pagination.
2. **Filter-scoped stats** so the stats panel reflects the active view.
3. **Notes interactions** — click a sticky to bring it up front, and also implement right-click custom menu to provide convenient filter shortcuts ( apply note color or author filter ).
4. **Virtualization** — if boards grow to thousands of notes, virtualize the note list or move to a canvas layer.

---

