import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import viteTsconfigPaths from 'vite-tsconfig-paths' // https://vitejs.dev/config/

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          jotai: ['jotai'],
          react: ['react', 'react-dom'],
          reactHotToast: ['react-hot-toast'],
          reactRouter: ['react-router', 'react-router-dom'],
          bbachainWeb3: ['@bbachain/web3.js'],
          bbachainWalletAdapters: [
            '@bbachain/wallet-adapter-base',
            '@bbachain/wallet-adapter-react',
            '@bbachain/wallet-adapter-react-ui',
          ],
          tabler: ['@tabler/icons-react'],
          tanstack: ['@tanstack/react-query'],
        },
      },
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
        }),
      ],
    },
  },
  plugins: [viteTsconfigPaths(), react(), nodePolyfills()],
})
