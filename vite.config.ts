
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Listen on all addresses including LAN and public addresses
    port: 8080,
    strictPort: true, // Don't try other ports if 8080 is taken
    cors: true, // Enable CORS for all origins
    hmr: {
      clientPort: mode === 'production' ? 443 : undefined, // Let HMR find the correct port in production
      host: mode === 'production' ? undefined : "localhost", // Let it auto-discover in production
      protocol: mode === 'production' ? "wss" : "ws", // Use secure WebSockets in production
      overlay: false, // Disable the overlay to prevent connection issues
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
    host: true, // Listen on all addresses
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
