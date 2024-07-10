<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import Chart from './Chart.vue'
  import { t } from '@/locales/index'
  import type { ListItem } from '@/@types/view/home'
  import { useChartStore } from '@/stores/chart'

  const store = useChartStore()

  const transActive = ref(1)
  const totalOrdersActive = ref(1)
  const isLoading = ref(false)
  // 數據
  const chartList = computed<ListItem[]>(() => {
    return [
      { title: t('overview.transactionTotal'), type: 'trans' },
      { title: t('overview.totalCompletedOrders'), type: 'orders' },
      { title: t('overview.storePageViews'), type: 'views' },
      { title: t('overview.newMembersCount'), type: 'members' },
    ]
  })

  const handleActive = (index: number, option: number, item: ListItem) => {
    if (isLoading.value) return
    if (index === 0) {
      transActive.value = option
    } else {
      totalOrdersActive.value = option
    }

    handleClick(item.type)
  }

  const handleClick = (type: 'trans' | 'orders' | 'views' | 'members') => {
    isLoading.value = true
    store.chartData(type)

    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
</script>

<template>
  <div
    v-for="(item, index) in chartList"
    :key="item.title"
    class="w-full space-y-3 rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300"
  >
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="text-sm font-normal">{{ item.title }}</div>
      <div class="btn">
        <div v-show="index === 0" class="flex flex-nowrap">
          <v-button-group>
            <v-button
              :class="transActive === 1 && 'bg-blue-400 text-white'"
              @click="handleActive(index, 1, item)"
              size="mini"
              >{{ $t('overview.transactionTotal') }}</v-button
            >
            <v-button
              :class="transActive === 2 && 'bg-blue-400 text-white'"
              @click="handleActive(index, 2, item)"
              size="mini"
              >{{ $t('overview.totalSales') }}</v-button
            >
          </v-button-group>
        </div>
        <div v-show="index === 1" class="flex flex-nowrap">
          <v-button-group>
            <v-button
              class="text-nowrap"
              :class="totalOrdersActive === 1 && 'isActive__btn'"
              @click="handleActive(index, 1, item)"
              size="mini"
              >{{ $t('overview.totalCompletedOrders') }}</v-button
            >
            <v-button
              class="text-nowrap"
              :class="totalOrdersActive === 2 && 'isActive__btn'"
              @click="handleActive(index, 2, item)"
              size="mini"
              >{{ $t('overview.totalOrder') }}</v-button
            >
          </v-button-group>
          <RouterLink to="/orderManagement" class="ml-2" title="前往訂單頁面">
            <v-button icon="ri-share-box-line" size="mini" />
          </RouterLink>
        </div>
      </div>
    </div>
    <Chart :type="item.type" />
  </div>
</template>

<style scoped>
  .isActive__btn {
    @apply bg-blue-400 text-white;
  }
</style>
