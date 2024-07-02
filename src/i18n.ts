import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'
import zhRouter from './locales/zh-router'
import enRouter from './locales/en-router'

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
  locale: 'zh', // 預設語言
  fallbackLocale: 'en', // 替代語言
  messages
})

export const t = i18n.global.t
export default i18n