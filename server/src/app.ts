import cors from "cors";
import express from "express";

import { notesRouter } from "./routes/notes";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/notes", notesRouter);

  return app;
}
