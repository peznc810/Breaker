import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vSvg from './directives/svg'

const app = createApp(App)

app.directive('svg', vSvg)
app.use(createPinia())
app.use(router)

app.mount('#app')
