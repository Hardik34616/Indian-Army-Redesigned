import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: false,
    proxy: {
      '/api': {
        target: 'https://apps.sarvam.ai',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('proxyReqWs', (proxyReq, req, socket, options, head) => {
            proxyReq.setHeader('Origin', 'https://apps.sarvam.ai');
          });
        }
      }
    }
  }
});
