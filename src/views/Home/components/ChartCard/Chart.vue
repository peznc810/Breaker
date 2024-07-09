<script lang="ts" setup>
  import { computed, onBeforeMount, onMounted, ref } from 'vue'
  import Chart, { type ChartItem, type ChartConfiguration } from 'chart.js/auto'
  import { useChartStore } from '@/stores/chart'
  import { thousandsSeparator } from '@/utils/mixin'

  const store = useChartStore()
  const props = defineProps<{
    type: 'trans' | 'orders' | 'views' | 'members'
  }>()
  store.chartData(props.type)

  const myChart = ref<ChartItem | null>(null)

  // 跟依據當前時間顯示資料
  const labels = store.getTimeLabel()
  const chartData = computed(() => {
    switch (props.type) {
      case 'trans':
        return store.transChart
      case 'orders':
        return store.ordersChart
      case 'views':
        return store.viewsChart
      case 'members':
        return store.membersChart
      default:
        return []
    }
  })

  const count = chartData.value.reduce((a, b) => a + b, 0)

  const createChartData = () => {
    return {
      labels,
      datasets: [
        {
          backgroundColor: 'rgb(96, 165, 250)',
          borderColor: 'rgb(96, 165, 250)',
          data: chartData.value,
          pointRadius: 0,
          tension: 0,
        },
        {
          backgroundColor: 'rgba(96, 165, 250, 0.5)',
          borderColor: 'rgba(96, 165, 250, 0.5)',
          data: store.fakeData(),
          pointRadius: 0,
          tension: 0,
        },
      ],
    }
  }

  const data = ref(createChartData())

  const config: ChartConfiguration = {
    type: 'line',
    data: data.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          offset: true,
          grid: {
            display: false,
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.5)',
          },
        },
        y: {
          // max: 20000, // 顯示最大值
          border: {
            display: false,
          },
          grid: {
            display: true, // 是否顯示網隔線
            color: 'rgba(200, 200, 200, 0.3)',
          },
          ticks: {
            stepSize: 5000, // 間隔
            color: 'rgba(0, 0, 0, 0.5)',
            // 超過1000的值替換為k
            callback: (value: string | number) => {
              if (typeof value === 'number' && value >= 1000) {
                return `${value / 1000}k`
              }
              return value
            },
          },
        },
      },
    },
  }

  onMounted(() => {
    if (myChart.value) {
      new Chart(myChart.value, config)
    }
  })
</script>

<template>
  <div>
    <div class="text-lg font-bold">{{ thousandsSeparator(count) }}</div>
    <div class="mt-4 w-full">
      <canvas ref="myChart"></canvas>
    </div>
  </div>
</template>
