
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    host: true, // Listen on all available network interfaces
    // Add history API fallback for SPA routing
    historyApiFallback: true,
  },
  preview: {
    port: 8080,
    host: true, // Listen on all available network interfaces
    // Add history API fallback for SPA routing in preview mode
    historyApiFallback: true,
  },
  base: "/", // Use root path for better compatibility with hosting platforms
  plugins: [
    react({
      // Add this configuration to avoid issues with useLayoutEffect
      jsxImportSource: 'react',
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Ensure a single instance of React
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    sourcemap: mode !== 'production', // Only generate sourcemaps in development
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Remove console logs in production
        drop_debugger: mode === 'production', // Remove debugger statements in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui') || id.includes('class-variance-authority') || id.includes('tailwind')) {
              return 'vendor-ui';
            }
            return 'vendor'; // all other node_modules
          }
        }
      }
    }
  }
}));
