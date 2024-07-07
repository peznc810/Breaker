<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import Chart, { type ChartItem, type ChartConfiguration } from 'chart.js/auto'

  const myChart = ref<ChartItem | null>(null)

  // 跟依據當前時間顯示資料
  const getTimeLabel = () => {
    const date = new Date()
    const hour = date.getHours()

    const labels = ['00:00']

    for (let i = 1; i < hour; i += 2) {
      const label = `${i.toString().padStart(2, '0')}:00`

      if (label) {
        labels.push(label)
      }
    }

    return labels
  }
  const labels = getTimeLabel()

  const fakeData = () => {
    const data = []

    for (let i = 0; i < labels.length; i++) {
      data.push(Math.ceil(Math.random() * 10000))
    }

    return data
  }
  const data = {
    labels,
    datasets: [
      {
        backgroundColor: 'rgb(96, 165, 250)',
        borderColor: 'rgb(96, 165, 250)',
        data: fakeData(),
        pointRadius: 0, // hover時才顯示點
        tension: 0, // 折角
      },
      {
        backgroundColor: 'rgba(96, 165, 250, 0.5)',
        borderColor: 'rgba(96, 165, 250, 0.5)',
        data: fakeData(),
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
    new Chart(myChart.value as ChartItem, config)
  })
</script>

<template>
  <div class="w-full">
    <canvas ref="myChart"></canvas>
  </div>
</template>
