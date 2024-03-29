import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import postcss from './postcss.config.cjs'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   resolve: {
      alias: {
         'tailwind.config.cjs': path.resolve(__dirname, 'tailwind.config.cjs'),
         '@pages': path.resolve(__dirname, './src/pages'),
         '@components': path.resolve(__dirname, './src/components'),
         '@store': path.resolve(__dirname, './src/store'),
         '@route': path.resolve(__dirname, './src/route'),
         '@utils': path.resolve(__dirname, './src/utils'),
      },
   },
   optimizeDeps: {
      include: ['tailwind.config.cjs'],
   },
})
