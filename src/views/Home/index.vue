<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { t } from '@/locales/index'
  import ChartCard from './components/ChartCard/index.vue'
  import ToDoCard from './components/ToDoCard/index.vue'
  import HotCard from './components/HotCard/index.vue'
  import { useUserStore } from '@/stores/user'
  import { useChartStore } from '@/stores/chart'

  const store = useUserStore()
  const chartStore = useChartStore()

  // const isLoading = ref(false)

  const now = computed(() => {
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  })

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
  // 熱門商品

  // Methods
  // const handleClick = () => {
  //   isLoading.value = true

  //   setTimeout(() => {
  //     isLoading.value = false
  //   }, 1000)
  // }
  const handleClick = () => {
    chartStore.chartData()
  }
</script>

<template>
  <div class="p-6">
    <div class="flex flex-col gap-5">
      <div class="mb-4 text-2xl font-bold">{{ greet }}, {{ store.user?.username || '' }}</div>
      <!-- 待辦事項 -->
      <ToDoCard />
      <!-- 數據 -->
      <div class="analysis">
        <!-- 今日營運概況 -->
        <div class="mb-4 flex justify-between pl-2">
          <div class="text-slate-700/80">
            <div>{{ t('overview.operationalMsg') }}</div>
            <div class="text-xs">
              {{ `${t('overview.dataEndTime')} ${t('am')}${now}` }}
            </div>
          </div>
          <div class="space-x-6">
            <v-select :data="sortList" @click="handleClick" />
            <!-- <v-button
              icon="fc-combo-chart"
              class="transition-colors duration-200 hover:text-blue-500"
              :loading="isLoading"
              @click="handleClick"
            >
              {{ t('moreData') /** 更多數據 */ }}
            </v-button> -->
          </div>
        </div>
        <!-- Chart Card -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartCard />
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
