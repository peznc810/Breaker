import './assets/main.css'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import vSvg from './directives/svg'

const app = createApp(App)

app.directive('svg', vSvg)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
