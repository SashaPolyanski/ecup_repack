import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@theme': '/src/app/theme/index',
      '@global': '/src/app/styles/GlobalStyles/index',
      '@pages': '/src/pages/index',
      '@utils': '/src/utils/index',
      "@pages/": "/src/pages/",
      "@constants": "/src/constants/index",
      "@view": "/src/view",
      "@": "/src",
    },
  },
  server: {
    port: 3000,
  },
})
