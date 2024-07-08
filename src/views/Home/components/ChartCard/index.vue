<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import Chart from './Chart.vue'
  import { thousandsSeparator } from '@/utils/mixin'
  import { t } from '@/locales/index'
  import { useChartStore } from '@/stores/chart'

  const store = useChartStore()

  const transActive = ref(1)
  const totalOrdersActive = ref(1)
  // 數據
  const chartList = computed(() => {
    return [
      { title: t('overview.transactionTotal'), count: store.totalCount },
      { title: t('overview.totalCompletedOrders'), count: store.totalCount },
      { title: t('overview.storePageViews'), count: store.totalCount },
      { title: t('overview.newMembersCount'), count: store.totalCount },
    ]
  })

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
    v-for="(item, index) in chartList"
    :key="item.title"
    class="w-full space-y-3 rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="text-sm font-normal">{{ item.title }}</div>
      <div class="btn">
        <div v-show="index === 0" class="flex flex-nowrap">
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
        <div v-show="index === 1" class="flex flex-nowrap">
          <el-button-group class="ml-6">
            <el-button
              class="text-nowrap"
              :class="totalOrdersActive === 1 && 'isActive__btn'"
              @click="handleActive(index, 1)"
              size="mini"
              >{{ $t('overview.totalCompletedOrders') }}</el-button
            >
            <el-button
              class="text-nowrap"
              :class="totalOrdersActive === 2 && 'isActive__btn'"
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

    <div v-if="index === 0" class="text-lg font-bold">NT$ {{ thousandsSeparator(item.count) }}</div>
    <div v-else class="text-lg font-bold">{{ thousandsSeparator(item.count) }}</div>

    <!-- Chart -->
    <div class="mt-4">
      <Chart />
    </div>
  </div>
</template>

<style scoped>
  .isActive__btn {
    @apply bg-blue-400 text-white;
  }
</style>
