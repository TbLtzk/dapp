import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [react(), eslint(), checker({ typescript: true })],
  optimizeDeps: {
    esbuildOptions: {
      define: { global: 'globalThis' },
    },
  },
  resolve: {
    alias: {
      web3: 'web3/dist/web3.min.js',
      stream: 'stream-browserify',
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      constants: path.resolve(__dirname, './src/constants'),
      contracts: path.resolve(__dirname, './src/contracts'),
      func: path.resolve(__dirname, './src/func'),
      hooks: path.resolve(__dirname, './src/hooks'),
      json: path.resolve(__dirname, './src/json'),
      navigation: path.resolve(__dirname, './src/navigation'),
      pages: path.resolve(__dirname, './src/pages'),
      store: path.resolve(__dirname, './src/store'),
      i18n: path.resolve(__dirname, './src/i18n'),
      connectors: path.resolve(__dirname, './src/connectors'),
    },
  }
});
