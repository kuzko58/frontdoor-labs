import { crx } from "@crxjs/vite-plugin";
import react from '@vitejs/plugin-react'
import path from "path";
import { defineConfig, normalizePath } from "vite";
import manifest from "./manifest.json";

const srcDir = normalizePath(path.resolve(path.dirname(import.meta.url), "src"));


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      src: srcDir,
    },
  },
});