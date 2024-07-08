import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref('zh')
  function changeLocale(value: string) {
    locale.value = value
  }
  return { locale, changeLocale }
})
