<script setup lang="ts">
  import type { CardProps } from '@/@types/components/card'
  const props = defineProps<CardProps>()
</script>

<template>
  <div
    v-for="(item, index) in props.data"
    :key="index"
    class="w-full rounded-sm bg-white p-4 shadow-md transition-shadow duration-300"
    :class="props.class"
  >
    <slot :row="item" />
  </div>
</template>
