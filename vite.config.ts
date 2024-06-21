import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/buchweb/',
  server: {
    port: 4200,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
