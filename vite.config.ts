import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import inspect from 'vite-plugin-inspect'

export default defineConfig({
  root: './frontend',
  envDir: '../',
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
  plugins: [
    react(),
    inspect(),
  ],
})
