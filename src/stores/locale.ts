import { defineStore,  } from 'pinia'
// import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref(localStorage.getItem('locale') || 'zh')

  const setLocale = (value: 'zh' | 'en'): void => {
    localStorage.setItem('locale', value)
    locale.value = value
  }

  return { locale, setLocale }
})
