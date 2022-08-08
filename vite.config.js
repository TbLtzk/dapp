import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    react(),
    !isProduction && checker({ typescript: true }),
    !isProduction && eslint()
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: { global: 'globalThis' },
    },
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      web3: 'web3/dist/web3.min.js',
      stream: 'stream-browserify',
      process: 'process/browser',
      zlib: 'browserify-zlib',
      util: 'util',
      // HACK: https://github.com/webpack/webpack/issues/12197
      'react-bootstrap-table2-toolkit': 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit',
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      constants: path.resolve(__dirname, './src/constants'),
      contracts: path.resolve(__dirname, './src/contracts'),
      utils: path.resolve(__dirname, './src/utils'),
      hooks: path.resolve(__dirname, './src/hooks'),
      json: path.resolve(__dirname, './src/json'),
      navigation: path.resolve(__dirname, './src/navigation'),
      pages: path.resolve(__dirname, './src/pages'),
      store: path.resolve(__dirname, './src/store'),
      i18n: path.resolve(__dirname, './src/i18n'),
      connectors: path.resolve(__dirname, './src/connectors'),
      context: path.resolve(__dirname, './src/context'),
      ui: path.resolve(__dirname, './src/ui'),
      styles: path.resolve(__dirname, './src/styles'),
      locales: path.resolve(__dirname, './src/locales'),
    },
  }
});
