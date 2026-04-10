import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProduction = mode === 'production';
    
    return {
      server: {
        port: 5175,
        host: '0.0.0.0',
        proxy: !isProduction ? {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
          }
        } : undefined
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'http://localhost:3001/api')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true,
            passes: 2,
          },
          format: {
            comments: false,
          },
        },
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor': ['react', 'react-dom', 'react-router-dom'],
            }
          }
        }
      }
    };
});
