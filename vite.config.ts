import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import path from "path";

export default defineConfig({
  build: {
    outDir: "public",
  },
  publicDir: false,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "!": path.resolve(__dirname, "./config"),
    },
  },
  plugins: [TanStackRouterVite(), react()],
});
