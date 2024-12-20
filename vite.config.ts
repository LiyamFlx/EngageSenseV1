import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      timeout: 5000
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});