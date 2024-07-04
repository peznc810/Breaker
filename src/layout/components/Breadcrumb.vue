<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'

  const route = useRoute()
  const routeName = computed(() => route.name || route.path)
</script>

<template>
  <div
    v-if="route.fullPath !== '/dashboard'"
    class="breadcrumb border-b bg-white px-4 py-3 shadow-sm"
  >
    <Transition name="bread" mode="out-in">
      <div :key="routeName">{{ routeName }}</div>
    </Transition>
  </div>
</template>

<style scoped>
  .bread-enter-active,
  .bread-leave-active {
    transition: all 0.5s ease;
  }

  .bread-enter-from,
  .bread-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }
</style>
