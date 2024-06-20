import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import vuetify from 'vite-plugin-vuetify';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Map '@' to your source directory
      '@assets': path.resolve(__dirname, './src/assets'), // Create additional aliases as needed
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [vue(),

    vuetify({ autoImport: true,
      styles: { configFile: 'src/settings.scss' }
     },),
  ],
})


