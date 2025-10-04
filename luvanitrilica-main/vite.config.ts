import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom'], // Force single version of React
  },
  build: {
    // Optimize chunks for better caching and reduced initial bundle
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          
          // UI library chunks
          if (id.includes('@radix-ui')) {
            return 'vendor-ui';
          }
          
          // Icons and utilities
          if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'vendor-utils';
          }
          
          // Router and query client
          if (id.includes('react-router') || id.includes('@tanstack/react-query')) {
            return 'vendor-router';
          }
          
          
          // Component chunks for lazy loading
          if (id.includes('components/') && !id.includes('components/ui/') && !id.includes('Header') && !id.includes('Hero')) {
            return 'components-lazy';
          }
          
          // Keep critical components in main chunk
          if (id.includes('Header') || id.includes('Hero') || id.includes('App.tsx')) {
            return 'main';
          }
        }
      }
    },
    // Enable image optimization
    assetsInlineLimit: 4096, // Inline small assets as data URLs
    // Enable code splitting with smaller chunks
    chunkSizeWarningLimit: 500,
  },
  // Image optimization settings
  assetsInclude: ['**/*.webp'],
}));
