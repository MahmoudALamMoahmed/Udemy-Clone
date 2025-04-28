// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // يسمع على كل الشبكات مش localhost بس
    port: process.env.VITE_PORT || 5173, // يستخدم البورت اللي Render يديه، أو 5173 لو بتشغل محلي
    allowedHosts: [".onrender.com"], // يسمح للمضيف الذي ينتهي بـ .onrender.com
  },
});
