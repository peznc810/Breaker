<script lang="ts" setup>
  import type { ButtonEmit, ButtonProps } from '@/@types/components/button'
  import { computed } from 'vue'

  const props = defineProps<ButtonProps>()
  const emit = defineEmits<ButtonEmit>()

  const iconSize = computed(() => props.iconSize || '1')
  const isLoading = computed(() => props.loading)

  const handleClick = () => {
    emit('click')
  }
</script>

<template>
  <button
    type="button"
    class="rounded-md text-sm font-medium shadow-md"
    :class="[
      !isLoading && props.class,
      !isLoading && 'hover:cursor-pointer',
      props.size === 'mini' ? 'px-2' : 'px-3',
    ]"
    :disabled="props.loading"
    @click="handleClick"
  >
    <!-- Loading的樣式 -->
    <v-icon
      v-if="isLoading"
      name="ri-loader-2-fill"
      :scale="iconSize"
      animation="spin"
      speed="slow"
      class="mr-1"
    />
    <!-- 預設樣式 -->
    <v-icon v-else-if="props.icon" :name="props.icon" :scale="iconSize" class="mr-1" />
    <span :class="isLoading && 'text-slate-600/40'">
      <slot />
    </span>
  </button>
</template>
