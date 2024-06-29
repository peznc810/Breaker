<template>
  <aside class="fixed bottom-0 left-0 top-0 z-10 w-60 bg-gray-700 text-white">
    <ul class="absolute bottom-0 top-[50px] w-60 overflow-y-auto">
      <li v-for="menu in menus" :key="menu.name">
        <RouterLink
          :to="menu.path"
          active-class="bg-gray-600 shadow-sm"
          class="inline-block w-full px-4 py-3 hover:bg-gray-600"
          >{{ menu.name }}</RouterLink
        >
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const menus = reactive([
  { name: '總覽', path: '/dashboard', icon: '' },
  { name: '訂單管理', path: '/orderManagement', icon: '' },
  { name: '商品管理', path: '/productManagement', icon: '' },
  { name: '報表及分析', path: '/report', icon: '' }
])
</script>

<style scoped></style>
