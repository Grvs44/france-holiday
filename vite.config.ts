import react from '@vitejs/plugin-react'
import license from 'rollup-plugin-license'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'inline',
      manifest: {
        name: 'France Holiday',
        short_name: 'Holiday',
        background_color: '#c9ffc9',
        theme_color: '#c9ffc9',
      },
      registerType: 'autoUpdate',
      includeAssets: ['*.csv'],
      workbox: {
        navigateFallbackDenylist: [/^.*.txt/],
      },
    }),
    createHtmlPlugin({ minify: true }),
  ],
  build: {
    assetsDir: '',
    rollupOptions: {
      plugins: [
        license({
          thirdParty: {
            includeSelf: true,
            output: { file: 'dist/licenses.txt' },
          },
        }),
      ],
    },
  },
})
