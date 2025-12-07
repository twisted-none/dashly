import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Это важно для Docker
    strictPort: true,
    port: 5173,
    watch: {
      usePolling: true // Важно для Windows Docker Desktop, чтобы работал Hot Reload
    }
  }
})