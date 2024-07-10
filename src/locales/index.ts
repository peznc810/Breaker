import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { useLocaleStore } from '@/stores/locale'
import zh from './zh'
import en from './en'
import zhRouter from './zh-router'
import enRouter from './en-router'

const store = useLocaleStore(createPinia())

const messages = {
  zh: {
    ...zh,
    ...zhRouter,
  },
  en: {
    ...en,
    ...enRouter,
  },
}

const i18n = createI18n({
  legacy: false, // 官方說如果要用composition API的話，必須要關掉legacy的狀態
  locale: store.locale, // 預設語言
  fallbackLocale: 'en', // 替代語言
  messages,
  // globalInjection: true, // 全域注入尚未成功
})


export const t = i18n.global.t
export default i18n
