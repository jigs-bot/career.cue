import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: readFileSync(resolve("./", 'cert.key')),
      cert: readFileSync(resolve("./", 'cert.crt')),
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

})
