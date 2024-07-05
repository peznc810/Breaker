<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { t } from '@/locales/index'
  import ChartCard from './components/ChartCard.vue'
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
  // 未處理概況
  const cardList = computed(() => {
    return [
      { title: t('overview.unRead') /** 留言未讀取 */, count: 20, icon: 'ri-message-2-line' },
      { title: t('overview.unShipped' /** 訂單未出貨 */), count: 1847, icon: 'hi-clipboard-list' },
      { title: t('overview.unpaid') /** 訂單未付款 */, count: 68, icon: 'bi-credit-card-2-back' },
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
      <!-- 未處理概況 -->
      <div class="flex items-center justify-center gap-4">
        <el-card
          :data="cardList"
          class="hover:cursor-pointer hover:shadow-lg hover:shadow-black/10"
        >
          <template #default="{ row }">
            <div class="flex h-full flex-col items-center justify-center gap-5">
              <v-icon :name="row.icon" scale="1.3" class="text-blue-400" />
              <div class="text-xl font-medium">{{ row.count }}</div>
              <div>{{ row.title }}</div>
            </div>
          </template>
        </el-card>
      </div>

      <!-- 數據 -->
      <div class="analysis">
        <!-- 今日營運概況 -->
        <div class="mb-4 flex justify-between">
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
