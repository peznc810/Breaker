<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue'
  import { t } from '@/i18n'
  import Card from '@/components/Card.vue'
  import ChartCard from './components/ChartCard.vue'
  import Select from '@/components/Select.vue'
  // TODO: 從pinia取得
  const userName = ref('RubyChen')
  const sortList = computed(() => {
    return [
      { label: t('select.today'), value: 1 },
      { label: t('select.yesterday'), value: 2 },
      { label: t('select.sevenDaysBefore'), value: 3 },
      { label: t('select.thirtyDaysBefore'), value: 4 },
    ]
  })
  // 三大類
  const cardList = computed(() => {
    return [
      { title: t('overview.unRead') /** 留言未讀取 */, count: 20, icon: 'ri-message-2-line' },
      { title: t('overview.unShipped' /** 訂單未出貨 */), count: 1847, icon: 'hi-clipboard-list' },
      { title: t('overview.unpaid') /** 訂單未付款 */, count: 68, icon: 'bi-credit-card-2-back' },
    ]
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

  // Methods
</script>

<template>
  <div class="container py-6">
    <div class="flex flex-col gap-5">
      <div class="mb-4 text-2xl font-bold">{{ greet }}, {{ userName }}</div>
      <!-- 未處理概況 -->
      <div class="flex items-center justify-center gap-4">
        <Card :data="cardList" class="hover:cursor-pointer hover:shadow-lg hover:shadow-black/10">
          <template #default="{ row }">
            <div class="flex h-full flex-col items-center justify-center gap-5">
              <v-icon :name="row.icon" scale="1.3" fill="#5087e6" />
              <div class="text-xl font-medium">{{ row.count }}</div>
              <div>{{ row.title }}</div>
            </div>
          </template>
        </Card>
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
            <Select :data="sortList" />
            <button
              type="button"
              class="ml-6 rounded-md bg-white px-3 py-2 text-sm font-medium shadow-md hover:text-blue-500"
            >
              <v-icon name="fc-combo-chart" scale="1" />
              {{ t('moreData') /** 更多數據 */ }}
            </button>
          </div>
        </div>
        <!-- Chart Card -->
        <div class="grid grid-cols-2 gap-4">
          <ChartCard :data="cardList" />
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
