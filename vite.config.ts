import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from 'vite-plugin-html';

const base_url = '/starter-shadcn/';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          BASE_URL: base_url, // This should match the base URL
        },
      },
    }),
  ],
  base: base_url,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
