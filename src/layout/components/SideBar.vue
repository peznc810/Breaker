<template>
  <aside class="fixed bottom-0 left-0 top-0 z-10 w-60 bg-gray-700 text-white">
    <ul class="absolute bottom-0 top-[50px] w-60 overflow-y-auto">
      <li v-for="menu in menus" :key="menu.name">
        <RouterLink
          :to="menu.path"
          active-class="bg-gray-600 shadow-sm"
          class="inline-block w-full px-4 py-3 hover:bg-gray-600"
        >
          <v-icon :name="menu.icon" scale="1" />
          {{ menu.name }}
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
  import { t } from '@/i18n'
  import { reactive, ref, computed } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'

  const route = useRoute()

  const menus = computed(() => {
    return [
      { name: t('dashboard'), path: '/dashboard', icon: 'bi-grid-1x2' },
      { name: t('orderManagement'), path: '/orderManagement', icon: 'hi-clipboard-list' },
      { name: t('productManagement'), path: '/productManagement', icon: 'la-shopping-bag-solid' },
      { name: t('report'), path: '/report', icon: 'la-user-solid' },
    ]
  })
</script>

<style scoped></style>
