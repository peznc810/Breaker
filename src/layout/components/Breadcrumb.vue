<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'

  const route = useRoute()
  const routeName = computed(() => route.meta.title)
  const hasParams = computed(() => !!Object.keys(route.params).length)
  const params = computed(() => Object.keys(route.params)[0])
</script>

<template>
  <Transition name="bread" mode="out-in">
    <div
      v-if="route.fullPath !== '/dashboard'"
      class="breadcrumb absolute left-0 right-0 border-b bg-white px-4 py-3 shadow-sm"
    >
      <div :key="route.path">
        <span>{{ routeName }}</span>
        <v-icon v-if="hasParams" name="bi-chevron-right" />
        <span v-if="hasParams">{{ route.params[params] }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
  .bread-enter-active {
    transition: all 0.5s ease-in 0.5s;
  }

  .bread-leave-active {
    transition: all 0.5s ease-in;
  }

  .bread-enter-from,
  .bread-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>
