<script lang="ts" setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import Chart from './Chart.vue'

  const props = defineProps<{
    data: any
    class?: string
  }>()

  const transActive = ref(1)
  const totalOrdersActive = ref(1)

  const handleActive = (index: number, option: number) => {
    if (index === 0) {
      transActive.value = option
    } else {
      totalOrdersActive.value = option
    }
  }
</script>

<template>
  <div
    v-for="(item, index) in props.data"
    :key="item.title"
    class="w-full space-y-3 rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="text-md font-normal">{{ item.title }}</div>
      <div class="btn">
        <div v-show="index === 0">
          <el-button-group class="ml-6">
            <el-button
              :class="transActive === 1 && 'bg-blue-400 text-white'"
              @click="handleActive(index, 1)"
              size="mini"
              >{{ $t('overview.transactionTotal') }}</el-button
            >
            <el-button
              :class="transActive === 2 && 'bg-blue-400 text-white'"
              @click="handleActive(index, 2)"
              size="mini"
              >{{ $t('overview.totalSales') }}</el-button
            >
          </el-button-group>
        </div>
        <div v-show="index === 1">
          <el-button-group class="ml-6">
            <el-button
              :class="totalOrdersActive === 1 && 'bg-blue-400 text-white'"
              @click="handleActive(index, 1)"
              size="mini"
              >{{ $t('overview.totalCompletedOrders') }}</el-button
            >
            <el-button
              :class="totalOrdersActive === 2 && 'bg-blue-400 text-white'"
              @click="handleActive(index, 2)"
              size="mini"
              >{{ $t('overview.totalOrder') }}</el-button
            >
          </el-button-group>
          <RouterLink to="/orderManagement" class="ml-2">
            <el-button icon="ri-share-box-line" size="mini" />
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="text-lg font-bold">NT$ {{ item.count }}</div>

    <!-- Chart -->
    <div class="mt-4">
      <Chart />
    </div>
  </div>
</template>

<style scoped></style>
