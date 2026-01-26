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
      includeAssets: ['logo.webp', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Michał Kapusz - Trener Tenisa',
        short_name: 'Kapusz Tenis',
        description: 'Profesjonalne lekcje tenisa we Wrocławiu i Bolesławcu',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo.webp',
            sizes: '192x192',
            type: 'image/webp'
          },
          {
            src: 'logo.webp',
            sizes: '512x512',
            type: 'image/webp'
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
