import "dotenv/config";
import express from "express";
import path from "node:path";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "configs/db.config.ts";
import setupSwagger from "configs/swagger.config.ts";
import verifyJWT from "middlewares/auth.verifyJWT.middleware.ts";
import requestLogger from "middlewares/requestLogger.middleware.ts";
import authRoute from "routes/auth.route.ts";
import usersRoute from "routes/users.route.ts";
import postsRoute from "routes/posts.route.ts";

connectDb();

const app = express();

setupSwagger(app);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use("/api/auth", authRoute);
app.use("/api/users", verifyJWT, usersRoute);
app.use("/api/posts", verifyJWT, postsRoute);

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
