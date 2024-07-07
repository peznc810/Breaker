<script setup lang="ts">
  import { t } from '@/locales/index'
  import { ref, computed } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'

  const router = useRouter()
  console.log(router.options.routes[0].children)

  const props = defineProps({
    show: Boolean,
  })

  const menus = router.options.routes[0].children

  // const menus = computed(() => {
  //   return [
  //     { name: t('dashboard'), path: '/dashboard', icon: 'bi-grid-1x2' },
  //     { name: t('orderManagement'), path: '/orderManagement', icon: 'hi-clipboard-list' },
  //     { name: t('productManagement'), path: '/productManagement', icon: 'la-shopping-bag-solid' },
  //     { name: t('report'), path: '/report', icon: 'la-user-solid' },
  //   ]
  // })
</script>

<template>
  <aside
    class="fixed bottom-0 left-0 top-0 z-10 bg-gray-700 text-slate-200/50 lg:w-60"
    :class="props.show ? 'w-60' : 'w-0'"
  >
    <ul class="absolute bottom-0 top-[50px] w-full overflow-y-auto">
      <li v-for="menu in menus" :key="menu.name">
        <RouterLink
          :to="menu.path"
          active-class="bg-gray-600 shadow-sm text-white"
          class="inline-block w-full px-4 py-3 hover:bg-gray-600"
        >
          <v-icon :name="menu.meta && menu.meta.icon" scale="1" />
          {{ menu.name }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>
