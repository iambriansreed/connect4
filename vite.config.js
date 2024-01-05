// vite.config.js
import { defineConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
    base: '',
    build: {
        target: 'es2015',
        outDir: 'build',
    },
    server: {
        port: 4444,
    },
    // omit
});
