<template>
  <header class="fixed top-0 z-20 h-[50px] w-full shadow-md">
    <div class="flex h-full justify-between">
      <div class="grid h-[50px] w-60 place-content-center border-b bg-primary text-white">
        <div class="flex-shrink-0">IF SHOP</div>
      </div>
      <nav class="flex-1 bg-white px-5">
        <div class="flex h-full items-center justify-end">
          <div class="relative">
            <span>你好，RubyChen</span>
            <button type="button">
              <el-icon :size="18">
                <ArrowDown />
              </el-icon>
            </button>
            <ul class="absolute top-9 flex w-32 flex-col border bg-white text-sm">
              <li v-for="menu in menus" :key="menu.name">
                <RouterLink
                  class="inline-block w-full border-b px-4 py-2 hover:bg-gray-100/60"
                  href="#"
                  >{{ menu.name }}</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { reactive } from 'vue'

const menus = reactive([
  { name: '個人資料', path: '/profile', icon: '' },
  { name: '更改密碼', path: '/changePassword', icon: '' },
  { name: '登出', path: '/logout', icon: '' }
])
</script>

<style scoped></style>
