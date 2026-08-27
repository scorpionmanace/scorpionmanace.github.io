import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  // Served from the domain root (scorpionmanace.github.io).
  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@core': path.resolve(__dirname, './src/core'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@data': path.resolve(__dirname, './src/data'),
      '@design': path.resolve(__dirname, './src/design'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },

  build: {
    outDir: 'dist',
    sourcemap: false,

    // Minification was previously disabled, which shipped ~2x the necessary
    // JavaScript to every visitor.
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split the two large, independently-cacheable vendor groups so a
        // React upgrade doesn't invalidate the animation bundle and vice versa.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'motion'
          }
          if (id.includes('react-router') || id.includes('/react-dom/') || id.includes('/react/')) {
            return 'react'
          }
          return 'vendor'
        },

        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },

      onwarn(warning, warn) {
        if (warning.code === 'CIRCULAR_DEPENDENCY') return
        warn(warning)
      },
    },
  },

  server: {
    port: 5175,
    host: true,
    open: true,
  },

  preview: {
    port: 4173,
    host: true,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: false,
  },
})
