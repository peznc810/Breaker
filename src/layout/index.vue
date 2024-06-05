<template>
  <div class="app-wrapper">
    <div class="relative h-screen w-full overflow-x-hidden bg-light pt-[50px]">
      <NavBar />
      <SideBar />
      <div class="app-main">
        <div class="absolute bottom-0 left-60 right-0 top-[50px]">
          <main class="container h-full overflow-y-auto">
            <Breadcrumb />
            <RouterView />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import NavBar from './components/NavBar.vue'
import Breadcrumb from './components/Breadcrumb.vue'
</script>

<style scoped></style>
