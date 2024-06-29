<template>
  <header class="fixed top-0 z-20 h-[50px] w-full shadow-md">
    <div class="flex h-full justify-between">
      <div class="grid h-[50px] w-60 place-content-center border-b bg-primary text-white">
        <div class="flex-shrink-0">IF SHOP</div>
      </div>
      <nav class="flex-1 bg-white px-5">
        <div class="flex h-full items-center justify-end">
          <div class="relative">
            <button type="button" @click="showMenu = !showMenu">
              <span>你好，RubyChen</span>
              <v-icon name="hi-chevron-down" scale="0.8" />
            </button>
            <!-- 下拉選單 -->
            <Transition name="slide-fade">
              <ul
                v-show="showMenu"
                class="absolute right-0 top-9 w-32 border border-b-0 bg-white text-sm shadow-lg"
              >
                <li v-for="menu in menus" :key="menu.name">
                  <RouterLink
                    class="inline-block min-w-full border-b px-4 py-2 hover:bg-gray-500 hover:text-white"
                    :to="menu.path"
                    >{{ menu.name }}</RouterLink
                  >
                </li>
              </ul>
            </Transition>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, reactive } from 'vue'

// TODO: 新增 path 路徑檔案
const menus = reactive([
  { name: '個人資料', path: '/profile' },
  { name: '更改密碼', path: '/changePassword' },
  { name: '登出', path: '/logout' }
])

const showMenu = ref(false)
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
