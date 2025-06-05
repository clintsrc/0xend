import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // bind to 0.0.0.0 instead of default localhost
    port: 3000, // note: vite client listens on 5173 by default
    open: false, // automatically open the browser to the url on start (not for docker!)
    proxy: {
        '/api': 'http://0xend-server:3001',
    },
  },
});
