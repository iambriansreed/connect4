// vite.config.js
import { defineConfig } from 'vite';
import fs from 'node:fs';

// https://vitejs.dev/config/
export default defineConfig(() => ({
    server: {
        port: 4444,
        https: {
            key: fs.readFileSync('./.cert/key.pem'),
            cert: fs.readFileSync('./.cert/cert.pem'),
        },
    },
}));
