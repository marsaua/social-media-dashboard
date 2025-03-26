import "dotenv/config";
import express from "express";
import path from "node:path";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "configs/db.config.ts";
import authRouter from "routes/auth.route.ts";
import verifyJWT from "middlewares/auth.verifyJWT.middleware.ts";
import morganLogger from "middlewares/morgan.middleware.ts";

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morganLogger);

app.use("/api/auth", authRouter);

app.use(verifyJWT);
// Protected endpoints

app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

if (process.env.NODE_ENV === "production") {
  // Serve static files from the client build directory
  app.use(express.static(path.join(import.meta.dirname, "../client/dist")));

  // Handle client-side routing by serving index.html for all non-API routes
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(import.meta.dirname, "../client/dist/index.html"));
    }
  });
}

export default app;
