import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vSvg from './directives/svg'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from './i18n'

import './assets/main.css'

const app = createApp(App)

app.directive('svg', vSvg) // custom directives
app.use(createPinia())
app.use(router)
app.use(i18n)
// ElementPlus Icon !!目前引入有問題!!
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
