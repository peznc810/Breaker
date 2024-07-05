<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import Chart, { type ChartItem, type ChartConfiguration } from 'chart.js/auto'

  const myChart = ref<ChartItem | null>(null)

  const labels = ['01:00', '03:00', '05:00', '07:00', '09:00', '11:00', '13:00']

  const data = {
    labels,
    datasets: [
      {
        backgroundColor: 'rgb(96, 165, 250)',
        borderColor: 'rgb(96, 165, 250)',
        data: [1000, 2837, 4829, 9273, 23746, 3289, 1000],
        pointRadius: 0, // hover時才顯示點
        tension: 0, // 折角
      },
      {
        backgroundColor: 'rgba(96, 165, 250, 0.5)',
        borderColor: 'rgba(96, 165, 250, 0.5)',
        data: [1900, 300, 9324, 2400, 1764, 2873, 7327],
        pointRadius: 0,
        tension: 0,
      },
    ],
  }

  const config: ChartConfiguration = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
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
    new Chart(myChart.value as ChartItem, config)
  })
</script>

<template>
  <div>
    <canvas ref="myChart" height="30" width="100"></canvas>
  </div>
</template>
