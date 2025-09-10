import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/frontend/',
  plugins: [react(), VitePWA({
    devOptions: { enabled: true },
    manifest: {
      name: 'WimBelemDon MAIS',
      short_name: 'WBD+',
      description: 'An app from WimBelemDon MAIS',
      theme_color: '#8DC740',
      background_color: '#0E6872',
      start_url: '.',
      display: 'standalone',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    registerType: 'autoUpdate',
  })],
  server: {
    port: 5173,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
      interval: 100
    }
  }
});
