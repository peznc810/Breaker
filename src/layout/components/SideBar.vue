<script setup lang="ts">
  import { RouterLink, useRouter } from 'vue-router'
  import { t } from '@/locales/index'

  const router = useRouter()

  const props = defineProps({
    show: Boolean,
  })
  const emits = defineEmits(['click'])

  const menus = router.options.routes[0].children
</script>

<template>
  <aside
    class="fixed bottom-0 left-0 top-0 z-10 bg-gray-700 text-slate-200/50 lg:w-60"
    :class="props.show ? 'w-60' : ''"
  >
    <ul class="absolute bottom-0 top-[50px] w-full overflow-y-auto">
      <li v-for="menu in menus" :key="menu.name" @click="emits('click')">
        <RouterLink
          v-if="menu.meta && !menu.meta.hidden"
          :to="`/${menu.path}`"
          active-class="bg-gray-600 shadow-sm text-white"
          class="inline-block w-full px-4 py-3 hover:bg-gray-600"
        >
          <v-icon :name="menu.meta && menu.meta.icon" scale="1" />
          {{ menu.meta && menu.meta.title }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>
