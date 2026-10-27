import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./lib/errors.js";

export function createApp() {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: env.NODE_ENV === "production" ? undefined : false }));
  app.use(cors({ origin: env.CLIENT_URL }));
  app.use(express.json({ limit: "100kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "mealsync-api" });
  });

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
