import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  build: {
    outDir: "public",
  },
  publicDir: false,
  plugins: [react()],
});
