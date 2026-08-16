import { Request, Router } from "express";
import { NoteFilter } from "../types";
import { getNotesStats, getNotesWithFilters } from "../services/notesService";
import Logger from "../utils/logger";
import { parseArray, parseDate } from "../utils/validation";

interface RawNoteQuery {
  author?: string | string[];
  color?: string | string[];
  until?: string;
}

type NoteRequest = Request<{}, {}, {}, RawNoteQuery>;

const parseNoteFilter = (filter: RawNoteQuery): NoteFilter => {
  if (!filter || Object.keys(filter).length === 0) {
    return {};
  }
  const { author, color, until } = filter;
  return {
    author: parseArray(author),
    color: parseArray(color),
    until: parseDate(until),
  };
};

export const notesRouter = Router();

notesRouter.get("/", async (req: NoteRequest, res) => {
  const filter = req.query || {};
  try {
    const parsedFilter: NoteFilter = parseNoteFilter(filter);
    Logger.info(`Parsed filters: ${JSON.stringify(parsedFilter)}`);
    const notesWithFilters = await getNotesWithFilters(parsedFilter);
    res.status(200).json(notesWithFilters);
  } catch (error) {
    Logger.error((error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
});

notesRouter.get("/stats", async (req: Request, res) => {
  try {
    const stats = await getNotesStats();
    res.status(200).json(stats);
  } catch (error) {
    Logger.error((error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
});
