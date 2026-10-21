import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // 2 หน้า: หน้าแรก (/) และหน้าแพ็คเกจ + ติดต่องาน (/contact/)
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        contact: resolve(import.meta.dirname, 'contact/index.html'),
      },
    },
  },
})
