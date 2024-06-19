import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: '/buchweb/',
  server: {
    port: 4200,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      https: 'https-browserify',
    },
  },
});
