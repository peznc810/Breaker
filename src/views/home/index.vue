<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { t } from '@/locales/index'
  import ChartCard from './components/ChartCard.vue'
  import ToDoCard from './components/ToDoCard.vue'
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
  const hotList = computed(() => {
    return [
      { img: '', title: '商品1', count: 100, viewCount: 20 },
      { img: '', title: '商品2', count: 200, viewCount: 58 },
      { img: '', title: '商品3', count: 300, viewCount: 46 },
      { img: '', title: '商品4', count: 400, viewCount: 10 },
      { img: '', title: '商品5', count: 500, viewCount: 6 },
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
          <div class="btn-group">
            <el-select :data="sortList" />
            <el-button
              icon="fc-combo-chart"
              class="ml-6 transition-colors duration-200 hover:text-blue-500"
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
      <el-card :data="hotList"></el-card>
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
