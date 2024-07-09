import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';


export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    // build: {
    //     outDir: 'dist',
    //     minify: 'esbuild',
    //     sourcemap: false,
    //     chunkSizeWarningLimit: 500,
    //     rollupOptions: {
    //     output: {
    //         manualChunks(id) {
    //         if (id.includes('node_modules')) {
    //             return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //         }
    //         },
    //     },
    //     },
    //     cssCodeSplit: true,
    // },
    // optimizeDeps: {
    //     include: ['react', 'react-dom'],
    //     exclude: ['js-big-decimal']
    // }
});
