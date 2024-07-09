<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useOrdersStore } from '@/stores/orders'

  const store = useOrdersStore()

  interface Info {
    date: string
    email: string
    id: number
    orderName: string
    orderNumber: string
    phone: string
    total: number
    products: any[]
  }

  const orderInfo = ref<Info>({
    date: '',
    email: '',
    id: 0,
    orderName: '',
    orderNumber: '',
    phone: '',
    total: 0,
    products: [],
  })

  onMounted(async () => {
    await store.getProducts()
    orderInfo.value = store.order
    console.log(orderInfo.value)
  })
</script>

<template>
  <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
    <!-- 訂單資料 -->
    <div class="">
      <v-card class="">
        <div class="border-b pb-2 text-lg text-blue-400">
          <span>訂單資料</span>
        </div>
        <div class="space-y-3 py-4 text-sm">
          <div>
            <span class="font-bold">訂單號碼</span>
            <p>{{ orderInfo.orderNumber }}</p>
          </div>
          <div>
            <span class="font-bold">訂單日期</span>
            <p>{{ orderInfo.date }}</p>
          </div>
          <div>
            <span class="font-bold">訂單來源</span>
            <p>前台購物網站</p>
          </div>
        </div>
      </v-card>
    </div>
    <!-- 訂購人資訊 -->
    <div class="">
      <v-card>
        <div class="border-b pb-2 text-lg text-blue-400">
          <span>訂購人資訊</span>
        </div>
        <div class="space-y-3 py-4 text-sm">
          <div>
            <span class="font-bold">訂購人</span>
            <p>{{ orderInfo.orderName }}</p>
          </div>
          <div>
            <span class="font-bold">訂單Email</span>
            <p>{{ orderInfo.email }}</p>
          </div>
          <div>
            <span class="font-bold">電話號碼</span>
            <p>{{ orderInfo.phone }}</p>
          </div>
        </div>
      </v-card>
    </div>
    <!-- 商品詳情 -->
    <div class="md:col-span-2">
      <v-card>
        <div class="border-b pb-2 text-lg text-blue-400">
          <span>商品詳情</span>
        </div>
        <div class="text-sm">
          <div class="mb-4 space-y-3 border-b py-4">
            <div v-for="item in orderInfo.products" :key="item.productId" class="flex gap-5">
              <div class="h-32 w-32 overflow-hidden">
                <img class="h-full w-full object-contain" :src="item.img" :alt="item.title" />
              </div>
              <div>
                <p class="font-bold">{{ item.title }}</p>
                <p>
                  {{ Math.ceil(item.quantity) }} x NT$ {{ Math.ceil(item.productPrice) }} = NT$
                  {{ Math.ceil(item.quantity * item.productPrice) }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex justify-between md:text-lg">
            <span class="font-bold">訂單合計</span>
            <p>NT$ {{ orderInfo.total }}</p>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style scoped></style>
