import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/rss-puzzle/',
  build: {
    outDir: 'dist',
    minify: false,
    cssMinify: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@data': path.resolve(__dirname, './src/data'),
      '@common': path.resolve(__dirname, './src/common'),
      '@utils': path.resolve(__dirname, './src/common/utils'),
      '@constants': path.resolve(__dirname, './src/common/constants'),
      '@enums': path.resolve(__dirname, './src/common/enums'),
      '@app-types': path.resolve(__dirname, './src/common/types'),
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 7777,
  },
});
