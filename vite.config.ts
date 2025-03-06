
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Allow connections from all network interfaces
    port: 8080,
    strictPort: true, // Don't try other ports if 8080 is taken
    cors: true, // Enable CORS for all origins
    hmr: {
      clientPort: mode === 'production' ? 443 : 8080, // Use proper port based on environment
      host: "localhost", // Use localhost for all environments to ensure proper connections
      protocol: "ws", // Use regular WebSocket protocol for all environments
      overlay: false, // Disable the overlay to prevent connection issues
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
    host: "0.0.0.0", // Allow connections from all network interfaces
    cors: true,
  },
  base: "/", // Ensure base path is set correctly for production deployment
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build settings
    sourcemap: false,
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('@tanstack')) {
              return 'vendor-tanstack';
            }
            return 'vendor'; // all other node_modules
          }
        }
      }
    }
  }
}));
