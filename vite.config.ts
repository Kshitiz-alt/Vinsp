import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'https://m2-remastered.vercel.app/'
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
