import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import basicSsl from '@vitejs/plugin-basic-ssl'
function pathResolve(dir) {
    return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),mkcert()
    ],
    resolve: {
        alias: {
            '/@/': fileURLToPath(new URL('./src', import.meta.url))
          }
    },
    // server: {				// ← ← ← ← ← ←
        
    // },	
    server: {
        host: '0.0.0.0',	// ← 新增内容 ←
        proxy: {
            '/socket': {
                target: 'http://192.168.0.159:5173',
                changeOrigin: true,  // 允许跨域
            },
            '/sse': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,  // 允许跨域
            },
            '/api': {
                target: 'http://192.168.0.159:3005',
                changeOrigin: true,  // 允许跨域
            }
        },
        https:true
    }
})
