import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { env } from "./src/config/env.ts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: env.pagesBasePath,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
});
