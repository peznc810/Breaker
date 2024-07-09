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
    <div class="relative h-screen overflow-x-hidden bg-light pt-[50px] text-slate-700">
      <NavBar @click="toggleSide" :show="showSide" />
      <SideBar :show="showSide" @click="toggleSide" />
      <div class="app-main">
        <div
          class="fixed bottom-0 right-0 top-[50px] transition-all duration-300 lg:left-60 lg:w-auto"
          :class="showSide ? 'left-60 w-full' : 'left-0'"
        >
          <main class="h-full overflow-y-auto overflow-x-hidden">
            <Breadcrumb />
            <Transition name="fade" mode="out-in">
              <RouterView v-slot="{ Component }">
                <component :is="Component" />
              </RouterView>
            </Transition>
            <!-- <RouterView /> -->
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease-in;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
</style>
