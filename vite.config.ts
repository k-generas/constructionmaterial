import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import dotenv from 'dotenv';
import express from 'express';
import { handleApiRequest } from './src/server/apiHandler.ts';

dotenv.config();

function apiServerPlugin(): Plugin {
  return {
    name: 'api-server-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const runHandler = () => {
          handleApiRequest(req, res, next).catch((err) => {
            console.error('API Error:', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Server Error' }));
            }
          });
        };

        if (req.method === 'GET' || req.method === 'HEAD' || req.readableEnded) {
          (req as any).body = {};
          return runHandler();
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          if (body.trim()) {
            try {
              (req as any).body = JSON.parse(body);
            } catch {
              (req as any).body = {};
            }
          } else {
            (req as any).body = {};
          }
          runHandler();
        });

        req.on('error', (err) => {
          console.error('Stream error:', err);
          next(err);
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
