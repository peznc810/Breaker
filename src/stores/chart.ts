import { ref } from "vue";
import { defineStore } from "pinia";

export const useChartStore = defineStore("chart", () => {
  const chart = ref();

  return { chart };
})