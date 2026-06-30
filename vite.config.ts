import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { ssr } from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    ssr({ 
      prerender: {
        parallel: 4
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'site-icon-192.png',
        'site-icon-512.png',
        'robots.txt',
        'sitemap.xml'
      ],
      manifest: {
        name: 'Michał Kapusz - Trener Tenisa',
        short_name: 'Kapusz Tenis',
        description: 'Profesjonalne lekcje tenisa we Wrocławiu i Bolesławcu',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'site-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'site-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  ssr: {
    noExternal: ['react-helmet-async']
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}));
