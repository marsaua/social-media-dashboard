import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ healthStatus: "ok" });
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

console.log(__dirname);
if (process.env.NODE_ENV === "production") {
  // Serve static files from the client build directory
  app.use(express.static(join(__dirname, "../client/dist")));

  // Handle client-side routing by serving index.html for all non-API routes
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(join(__dirname, "../client/dist/index.html"));
    }
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
