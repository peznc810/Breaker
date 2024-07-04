<script lang="ts" setup>
  const props = defineProps<{
    class?: string
  }>()
</script>

<template>
  <!-- 樣式放在全域 -->
  <div class="button-group" :class="props.class">
    <slot />
  </div>
</template>
