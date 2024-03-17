import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compressPlugin from 'vite-plugin-compression';
import visualizer from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3006,
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    }
  },
  // base: '/admin',
  base: '/adminpanel',
  build: {
    chunkSizeWarningLimit: 400, // El límite está en KB
    minify: 'terser',
    rollupOptions: {
      // Opciones para optimizar el tree shaking
      treeshake: {
        // Esta opción asegura que los módulos y componentes no utilizados sean eliminados
        moduleSideEffects: 'no-external',
        // Considera los efectos secundarios al hacer tree shaking (útil si tu código o dependencias los tienen)
        propertyReadSideEffects: false,
        // Intenta eliminar código aún si no se puede garantizar que sea seguro (útil en casos donde estás seguro de la pureza de tu código)
        tryCatchDeoptimization: false,
      },
    },
  },
  plugins: [
    vue(),
    compressPlugin({
      algorithm: 'gzip'
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  optimizeDeps: {
    exclude: ['oh-vue-icons/icons'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
