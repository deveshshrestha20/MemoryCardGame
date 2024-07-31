import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/MemoryGame/", // Add this line
  server: {
    port: 2500,
  },
});
