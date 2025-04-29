import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
  server: {
    host: true, // 👈 allows Vite to listen on your local network IP
    port: 5173, // or whatever port you prefer
  }
})
