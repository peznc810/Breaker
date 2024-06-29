<template>
  <div class="app-wrapper">
    <div class="relative h-screen w-full overflow-x-hidden bg-light pt-[50px]">
      <NavBar />
      <SideBar />
      <div class="app-main">
        <div class="fixed bottom-0 left-60 right-0 top-[50px]">
          <main class="container h-full overflow-y-auto">
            <Transition name="slide-fade">
              <!-- 強制重新渲染 -->
              <Breadcrumb :key="route.fullPath" />
            </Transition>
            <RouterView v-slot="{ Component }">
              <Transition>
                <component :is="Component" />
              </Transition>
            </RouterView>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'
import NavBar from './components/NavBar.vue'
import Breadcrumb from './components/Breadcrumb.vue'

const route = useRoute()
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
