import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

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
  plugins: [react()],
});
