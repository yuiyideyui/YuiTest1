// import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@photo-sphere-viewer/core/index.css';
import App from './App.vue'
import Terminal from 'vue-web-terminal'
import router from './router/index'
const app = createApp(App)
// app.use(router)
// app.use(AFRAME)
app.use(Terminal)
app.use(ElementPlus)
app.mount('#app')