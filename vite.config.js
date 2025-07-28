import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
    },
    proxy: {
      // پراکسی برای API اصلی
      '/api': {
        target: 'https://harf.roshan-ai.ir',
        changeOrigin: true,
        rewrite: (path) => path,
        secure: false,
        logLevel: 'debug',
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying request:', req.url, 'Headers:', proxyReq.getHeaders());
          });

          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Proxy response:', proxyRes.statusCode, req.url);
          });

          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
            if (res.writeHead) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
            }
            res.end(JSON.stringify({ error: 'Proxy error' }));
          });
        },
      },

      // پراکسی برای media_image
      '/media_image': {
        target: 'https://harf.roshan-ai.ir',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      },
    },
  },
});
