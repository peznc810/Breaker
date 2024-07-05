import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import vSvg from './directives/svg'
import i18n from './locales/index'
// styles
import './assets/main.css'
// oh-vue-icons
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { ohIcon } from './plugins/ohIcon'
addIcons(...ohIcon);
// components
import { registerComponents} from '@/components/index'

const app = createApp(App)

// TODO: refactor plugins
app.directive('svg', vSvg) // custom directives
app.use(createPinia())
app.use(router)
app.use(i18n)

app.component('v-icon', OhVueIcon)
registerComponents(app)

app.mount('#app')
