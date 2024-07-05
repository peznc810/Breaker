<script lang="ts" setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'
  import SideBar from './components/SideBar.vue'
  import NavBar from './components/NavBar.vue'
  import Breadcrumb from './components/Breadcrumb.vue'

  const showSide = ref(false)
  // RWD
  const toggleSide = () => {
    showSide.value = !showSide.value
  }
</script>

<template>
  <div class="app-wrapper">
    <div class="relative h-screen w-full overflow-x-hidden bg-light pt-[50px] text-slate-700">
      <NavBar @click="toggleSide" :show="showSide" />
      <SideBar :show="showSide" />
      <div class="app-main">
        <div
          class="fixed bottom-0 top-[50px] lg:left-60"
          :class="showSide ? 'left-60 w-full' : 'left-0'"
        >
          <main class="h-full overflow-y-auto">
            <Breadcrumb />
            <RouterView />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
