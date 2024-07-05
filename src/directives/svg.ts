// 測試中...
import type { DirectiveBinding } from "vue";

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    console.log(el, binding);
    const src: string = binding.value
    if(!src) {
      console.warn('src is required !')
      return
    }

    fetch(src)
      .then(res => res.text())
      .then(text => {
        el.innerHTML = text
        console.log(text);
      })
      .catch(err => console.error('v-svg: Failed to load svg', err))
  },
}