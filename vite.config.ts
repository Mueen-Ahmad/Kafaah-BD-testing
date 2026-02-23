import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: { port: 3000, hmr: true },
  build: {
    chunkSizeWarningLimit: 1000, // সতর্কতা সীমা বাড়ানো
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
    minify: "esbuild", // দ্রুত মিনিফাই
  },
});
