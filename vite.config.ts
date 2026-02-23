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
        // ✅ উন্নত manualChunks: React আলাদা, বড় লাইব্রেরি আলাদা
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // React ইকোসিস্টেম (সবচেয়ে বড়)
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom") ||
              id.includes("scheduler")
            ) {
              return "react-vendor";
            }
            // html2pdf.js (বড় পিডিএফ লাইব্রেরি)
            if (id.includes("html2pdf.js")) {
              return "pdf-generator";
            }
            // অন্যান্য লাইব্রেরি (যেমন react-helmet-async)
            if (id.includes("react-helmet-async")) {
              return "utils";
            }
            // বাকি সব node_modules
            return "vendor";
          }
        },
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
    minify: "esbuild", // দ্রুত মিনিফাই
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
  },
});