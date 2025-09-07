import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react({
      // Enable faster refresh and optimize for production
      fastRefresh: true
    })
  ],
  base: '/', // Changed for GitHub Pages deployment

  // Optimize dependencies for better tree shaking
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@chakra-ui/react'],
    exclude: ['@chakra-ui/test-utils']
  },

  build: {
    // Enable source maps for debugging in production
    sourcemap: true,
    outDir: 'dist',

    // Optimize build output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },

    rollupOptions: {
      // Tree shake unused exports
      treeshake: true,
      output: {
        // Improve chunk splitting for better caching
        manualChunks: (id) => {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }

          // React Router
          if (id.includes('react-router')) {
            return 'router'
          }

          // Chakra UI core
          if (id.includes('@chakra-ui/react') ||
              id.includes('@chakra-ui/system') ||
              id.includes('@chakra-ui/hooks')) {
            return 'chakra-core'
          }

          // Chakra UI utilities
          if (id.includes('@chakra-ui/components') ||
              id.includes('@chakra-ui/theme') ||
              id.includes('@emotion')) {
            return 'chakra-utils'
          }

          // PDF generation libraries
          if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('dompurify')) {
            return 'pdf'
          }

          // Animation libraries
          if (id.includes('framer-motion')) {
            return 'animation'
          }

          // Large utility libraries
          if (id.includes('date-fns') || id.includes('lodash')) {
            return 'utils'
          }

          // JSON parsing utilities
          if (id.includes('json')) {
            return 'json-utils'
          }
        },

        // Optimize chunk naming for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },

      // Preload important modules
      onwarn(warning, warn) {
        // Suppress certain warnings that are not relevant
        if (warning.code === 'CIRCULAR_DEPENDENCY') return
        warn(warning)
      }
    },

    // Improve CSS optimization
    cssCodeSplit: true,
    cssMinify: true,

    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000, // 1MB

    // Enable assets inlining for small assets
    assetsInlineLimit: 4096, // 4KB

    // Optimize bundle reporting - uncomment to analyze bundle size
    // plugins: [visualizer({ filename: 'dist/report.html', open: true })]
  },

  // Configure server for development
  server: {
    port: 5175,
    host: true,
    open: true,
    fs: {
      // Allow serving files from any directory for development
      strict: false
    }
  },

  // Optimize preview server for production-like experience
  preview: {
    port: 4173,
    host: true
  }
})
