import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createBootstrap} from "bootstrap-vue-next";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import "bootstrap/dist/js/bootstrap.js";

import router from './router'
import App from "./App.vue";

const app = createApp(App)
app.use(createBootstrap())
app.use(createPinia())
app.use(router)
app.mount('#app')
