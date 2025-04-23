import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // asosiy joylash uchun
  server: {
    port: 5173, // standart Vite porti yoki o'zingiz xohlagan port
    strictPort: true,
  },
  build: {
    outDir: "./dist",
  },
});
