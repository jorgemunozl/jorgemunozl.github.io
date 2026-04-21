import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { componentTagger } from "lovable-tagger";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

export default defineConfig(({ mode }) => ({
  root: projectRoot,
  server: {
    host: "::",
    port: 8080,
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/dist/**",
        "**/docs/**",
        "**/build/**",
        "**/.next/**",
        "**/coverage/**",
        "**/.nyc_output/**",
        "**/tmp/**",
        "**/temp/**",
        "**/*.log",
        "**/.DS_Store",
        "**/Thumbs.db",
      ],
    },
  },
  base: mode === "production" ? "/" : "/",
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  css: {
    postcss: path.join(__dirname, "postcss.config.js"),
  },
  build: {
    outDir: path.resolve(projectRoot, "docs"),
    emptyOutDir: true,
  },
}));
