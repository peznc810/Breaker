import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrdersStore = defineStore('orders', () => {
  // state
  const orders = ref<any[]>([])
  const products = ref<any[]>([])
  const order = ref<any | null>(null)

  // getters
  const getOrders = async () => {
    const api = 'https://fakestoreapi.com/carts'
    try {
      const res = await axios.get(api)
      if (res.status === 200) {
        orders.value = res.data
      } else {
        console.error(res.status, res.statusText)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    }
  }

  const getProducts = async () => {
    const api = 'https://fakestoreapi.com/products'
    try {
      const res = await axios.get(api)
      if (res.status === 200) {
        products.value = res.data
      } else {
        console.error(res.status, res.statusText)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  // actions

  const setOrder = (item: any) => {
    order.value = item
  }

  return { order,orders, products, getOrders, getProducts, setOrder }
})
