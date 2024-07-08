import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', () => {
  const chart = ref()
  const totalCount = ref(0)

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

  const fakeData = () => {
    const data = []
    const labels = getTimeLabel()

    for (let i = 0; i < labels.length; i++) {
      data.push(Math.ceil(Math.random() * 10000))
    }

    totalCount.value = data.reduce((a, b) => a + b, 0)
    return data
  }

  const fakeData2 = () => {
    const data = []
    const labels = getTimeLabel()

    for (let i = 0; i < labels.length; i++) {
      data.push(Math.ceil(Math.random() * 10000))
    }

    totalCount.value = data.reduce((a, b) => a + b, 0)
    return data
  }

  return { chart, getTimeLabel, fakeData, fakeData2, totalCount }
})
