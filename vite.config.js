import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/prompt-coding/",
  server: {
    port: 4008,
  },
});
