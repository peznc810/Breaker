<script lang="ts" setup>
  import Card from '@/components/Card.vue'
  import type { ChartCardProps } from '@/@types/view/home'

  const props = defineProps<ChartCardProps>()
</script>

<template>
  <Card :data="props.data" class="hover:cursor-pointer hover:shadow-lg hover:shadow-black/10">
    <template #default="{ row }">
      <div class="flex h-full flex-col items-center justify-center gap-5">
        <v-icon :name="row.icon" scale="1.3" fill="#5087e6" />
        <div class="text-xl font-medium">{{ row.count }}</div>
        <div>{{ row.title }}</div>
      </div>
    </template>
  </Card>
</template>

<style scoped></style>
