import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Setup Path Aliases for absolute imports using "@/module"
      // Maps '@/' to the project's source directory (src/)
      '@/': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    // Standard configuration for development server
    port: 3000,
    host: '0.0.0.0', // Allows network access (useful for Docker/VMs)
  },
  build: {
    // Configure target for modern browsers
    target: 'es2020',
    // Output directory
    outDir: 'dist',
    sourcemap: true,
  }
})