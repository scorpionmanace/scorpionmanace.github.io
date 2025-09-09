import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      // Enable faster refresh and optimize for production
      fastRefresh: true
    })
  ],
  base: '/', // Changed for GitHub Pages deployment

  // Add aliasing for consistent React module resolution
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react-is': path.resolve(__dirname, './node_modules/react-is'),
      'hoist-non-react-statics': path.resolve(__dirname, './node_modules/hoist-non-react-statics')
    }
  },

  // Optimize dependencies for better tree shaking
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@chakra-ui/react', 'react-is', 'hoist-non-react-statics'],
    exclude: ['@chakra-ui/test-utils']
  },

  build: {
    // Disable sourcemaps for production to prevent sourcemap resolution errors
    // Source maps are generated for debugging but cause warnings in production
    sourcemap: false,
    outDir: 'dist',

    // Try without minification to isolate the issue
    minify: false,

    rollupOptions: {
      // Tree shake unused exports
      treeshake: true,
      output: {
        // Simplified chunking to avoid loading order issues
        manualChunks: (id) => {
          // Bundle all React-related dependencies together
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-is') ||
              id.includes('node_modules/hoist-non-react-statics') ||
              id.includes('@chakra-ui') ||
              id.includes('@emotion') ||
              id.includes('react-router')) {
            return 'vendor'
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
