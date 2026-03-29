import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/I2E-landing-page/',
  plugins: [react()],
  server: {
    host: true, // Allow external access
    allowedHosts: true, // Allow tunneling
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
