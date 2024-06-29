import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import vSvg from './directives/svg'
import i18n from './i18n'
// styles
import './assets/main.css'
// oh-vue-icons
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiChevronDown } from "oh-vue-icons/icons";

addIcons(HiChevronDown);

const app = createApp(App)

app.directive('svg', vSvg) // custom directives
app.use(createPinia())
app.use(router)
app.use(i18n)

app.component('v-icon', OhVueIcon)

app.mount('#app')
