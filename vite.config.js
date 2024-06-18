// vite.config.js
import { defineConfig } from 'vite';
import fs from 'node:fs';

export default defineConfig(() => ({
    server: {
        host: 'localhost',
        port: 4444,
        https: {
            key: fs.readFileSync('./.cert/key.pem'),
            cert: fs.readFileSync('./.cert/cert.pem'),
        },
    },
}));
