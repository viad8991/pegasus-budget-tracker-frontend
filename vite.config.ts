import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from "bootstrap-vue-next";

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [BootstrapVueNextResolver()]
        })
    ],
    server: {
        port: 3000,
        host: process.env.VITE_HOST,
    }
})
