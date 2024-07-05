<script setup lang="ts">
  import type { CardProps } from '@/@types/components/card'
  const props = defineProps<CardProps>()
</script>

<template>
  <div
    class="w-full rounded-md bg-white p-6 shadow-md transition-shadow duration-300"
    :class="props.class"
  >
    <slot />
  </div>
</template>
