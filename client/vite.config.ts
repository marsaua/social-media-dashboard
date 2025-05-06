import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { globalPrefix } from "server/src/config/app.config.ts";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      [globalPrefix]: {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
