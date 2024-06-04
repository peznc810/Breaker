<template>
  <div class="bg-light relative h-screen w-full overflow-x-hidden pt-[50px]">
    <NavBar class="fixed top-0 z-20 h-[50px] w-full shadow-md" />
    <SideBar
      class="absolute bottom-0 left-0 top-0 z-10 w-60 bg-gray-700 text-white"
    />
    <div class="absolute bottom-0 left-60 right-0 top-[50px]">
      <main class="container h-full overflow-y-auto">
        <div class="breadcrumb border-b bg-white px-4 py-3 shadow-sm">
          我未來會是麵包屑
        </div>
        <RouterView class="w-full px-4" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import NavBar from './components/NavBar.vue'

const logo = '/src/assets/logo.svg'
</script>

<style scoped></style>
