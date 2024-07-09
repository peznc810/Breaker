import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', () => {
  const transChart = ref<number[]>([])
  const ordersChart = ref<number[]>([])
  const viewsChart = ref<number[]>([])
  const membersChart = ref<number[]>([])

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

  const chartData = (type: 'trans' | 'orders' | 'views' | 'members') => {
    const data = []
    const labels = getTimeLabel()

    for (let i = 0; i < labels.length; i++) {
      data.push(Math.ceil(Math.random() * 10000))
    }

    switch (type) {
      case 'trans':
        transChart.value = data
        break
      case 'orders':
        ordersChart.value = data
        break
      case 'views':
        viewsChart.value = data
        break
      case 'members':
        membersChart.value = data
        break
    }
  }

  const fakeData = () => {
    const data = []
    const labels = getTimeLabel()

    for (let i = 0; i < labels.length; i++) {
      data.push(Math.ceil(Math.random() * 10000))
    }

    return data
  }

  return { getTimeLabel, chartData, fakeData, transChart, ordersChart, viewsChart, membersChart }
})
