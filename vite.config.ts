import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ['@emotion/babel-plugin']
    }
  }), svgr({exportAsDefault: true})],
  resolve: {
    alias: {
      '@theme': '/src/app/theme/index',
      '@global': '/src/app/styles/GlobalStyles/index',
      '@pages': '/src/pages/index',
      '@utils': '/src/utils/index',
      "@pages/": "/src/pages/",
      "@constants": "/src/constants/index",
      "@shared": "/src/shared/index",
      "@view": "/src/view",
      "@assets": "/src/assets",
      "@": "/src",
    },
  },

  server: {
    port: 3000,
  },
})
