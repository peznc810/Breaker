<template>
  <div class="breadcrumb border-b bg-white px-4 py-3 shadow-sm">
    {{ routeName }}
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const routeName = computed(() => route.name)
</script>

<style scoped></style>
