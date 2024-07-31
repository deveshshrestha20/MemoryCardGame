import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Memory-Card-Game/",
  server: {
    port: 2500,
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash].[ext]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  transformIndexHtml: {
    transform: (html) =>
      html.replace(/<head>/, `<head><base href="/Memory-Card-Game/">`),
  },
});
