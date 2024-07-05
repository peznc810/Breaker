<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { t } from '@/locales/index'
  import ChartCard from './components/ChartCard.vue'
  import ToDoCard from './components/ToDoCard.vue'
  import HotCard from './components/HotCard.vue'
  import { useUserStore } from '@/stores/user'

  const store = useUserStore()
  const isLoading = ref(false)

  // 問候語
  const greet = computed(() => {
    const date = new Date()
    if (date.getHours() < 12) {
      return t('morning')
    } else if (date.getHours() < 18) {
      return t('afternoon')
    } else {
      return t('evening')
    }
  })
  // 下拉選單
  const sortList = computed(() => {
    return [
      { label: t('select.today'), value: 1 },
      { label: t('select.yesterday'), value: 2 },
      { label: t('select.sevenDaysBefore'), value: 3 },
      { label: t('select.thirtyDaysBefore'), value: 4 },
    ]
  })
  // 數據
  const chartList = computed(() => {
    return [
      { title: t('overview.transactionTotal'), count: 55661 },
      { title: t('overview.totalCompletedOrders'), count: 24 },
      { title: t('overview.storePageViews'), count: 5360 },
      { title: t('overview.newMembersCount'), count: 17 },
    ]
  })
  // 熱門商品

  // Methods
  const handleClick = () => {
    isLoading.value = true

    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
</script>

<template>
  <div class="container py-6">
    <div class="flex flex-col gap-5">
      <div class="mb-4 text-2xl font-bold">
        <!-- 目前會空白狀態，需等登入系統完成 -->
        {{ greet }}, {{ store.user?.username || '' }}
      </div>
      <!-- 待辦事項 -->
      <ToDoCard />
      <!-- 數據 -->
      <div class="analysis">
        <!-- 今日營運概況 -->
        <div class="mb-4 flex justify-between pl-2">
          <div class="text-slate-700/80">
            <div>{{ t('overview.operationalMsg') }}</div>
            <div class="text-xs">
              {{ `${t('overview.dataEndTime')} ${t('am')}11:00` }}
            </div>
          </div>
          <div class="space-x-6">
            <el-select :data="sortList" />
            <el-button
              icon="fc-combo-chart"
              class="transition-colors duration-200 hover:text-blue-500"
              :loading="isLoading"
              @click="handleClick"
            >
              {{ t('moreData') /** 更多數據 */ }}
            </el-button>
          </div>
        </div>
        <!-- Chart Card -->
        <div class="grid grid-cols-2 gap-4">
          <ChartCard :data="chartList" />
        </div>
      </div>

      <!-- 熱門商品 -->
      <HotCard />
    </div>
  </div>
</template>

<style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
  }
</style>
