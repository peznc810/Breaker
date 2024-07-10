<script lang="ts" setup>
  import { useOrdersStore } from '@/stores/orders'
  import { useUserStore } from '@/stores/user'
  import { computed, onMounted, ref } from 'vue'
  import type { Column } from '@/@types/components/table'
  import moment from 'moment'
  import { RouterLink } from 'vue-router'
  import { thousandsSeparator } from '@/utils/mixin'
  import { t } from '@/locales'

  const store = useOrdersStore()
  const userStore = useUserStore()

  const orders = ref<any[]>([])
  const loading = ref(false)
  const search = ref('')
  const tableData = ref<any[]>([])
  const date = ref('')
  const pageSize = ref(5)
  const currentPage = ref(1)

  // 初始化數據
  const init = async () => {
    loading.value = true

    await userStore.getUsers()
    await store.getOrders()
    await store.getProducts()
    orders.value = store.orders
    loading.value = false
  }

  // 表格欄位
  const columnProps = computed<Column[]>(() => {
    return [
      { label: t('orderNumber'), prop: 'orderNumber' },
      { label: t('orderDate'), prop: 'date', sortable: true },
      { label: t('orderName'), prop: 'orderName' },
      { label: t('total'), prop: 'total', sortable: true },
    ]
  })

  // 格式化日期
  const formatDate = (date: string) => {
    const format = moment(date).format('YYYY-MM-DD HH:mm:ss')
    return format
  }
  // 商品資料重組
  const formatProductData = (data: any[]) => {
    const info = data.map((item) => {
      // 取得單項商品的資訊
      const productInfo = store.products.find((product) => product.id === item.productId)

      // 組合資訊
      item.productPrice = productInfo.price || 0
      item.img = productInfo.image || ''
      item.title = productInfo.title || ''

      return item
    })
    return info
  }
  // 購物車資料重組
  const getOrderUser = (id: number) => {
    const userInfo = userStore.users.find((user) => user.id === id)
    const orderName = userInfo ? userInfo.username : ''
    const email = userInfo ? userInfo.email : ''
    const phone = userInfo ? userInfo.phone : ''

    return { orderName, email, phone }
  }
  // 計算總額
  const calculateTotal = (data: any[]) => {
    const total = data.reduce((acc: number, item: any) => {
      const price = item.productPrice || 0
      const count = item.quantity || 0
      return Math.ceil(acc + price * count)
    }, 0)
    return total
  }
  // 製作訂單號碼
  const number = (date: string) => {
    const orderDate = moment().format('YYYYMMDDHHmmss')
    const tail = Math.ceil(Math.random() * 100)
      .toString()
      .padStart(3, '0')
    const orderNum = orderDate + tail

    return orderNum
  }
  // 重構資料
  const originData = computed(() => {
    const data = orders.value.map((order) => {
      const {
        date,
        products, // 購物車中的所有商品
        userId,
        ...orderItem
      } = order

      // 格式化時間
      const newDate = formatDate(date)
      // 取得商品價格，放入資料中
      const productInfo = formatProductData(products)
      // 計算總金額
      const totalPrice = calculateTotal(productInfo)
      // 取得訂購人
      const orderUser = getOrderUser(userId)
      // 訂單號碼
      const orderNumber = number(date)

      // 重組資料
      const newOrder = {
        ...orderItem,
        date: newDate,
        products: productInfo,
        total: totalPrice,
        orderNumber,
        ...orderUser,
      }

      return newOrder
    })
    return data
  })
  // 搜尋 & 分頁
  const currentTableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return originData.value.slice(start, end)
  })
  const handlePageChange = (val: number) => {
    currentPage.value = val
    tableData.value = currentTableData.value
  }
  const handleMobilePageChange = (val: number) => {
    loading.value = true
    currentPage.value = val
    // 為了切換頁面時有過渡效果
    tableData.value = []
    setTimeout(() => {
      tableData.value = currentTableData.value
    }, 500)
    loading.value = false
  }
  const filterData = computed(() => {
    const searchVal = search.value.toLowerCase()
    const searchAll = !searchVal || searchVal === ''

    if (searchAll) return currentTableData.value

    return originData.value.filter((item) => {
      return (
        item.orderNumber.toLowerCase().includes(searchVal) ||
        item.orderName.toLowerCase().includes(searchVal) ||
        item.email.toLowerCase().includes(searchVal) ||
        item.total.toString().includes(searchVal)
      )
    })
  })
  const filterDataDate = computed(() => {
    const searchVal = moment(date.value).format('YYYY-MM-DD')
    const searchAll = !searchVal || searchVal === ''

    if (searchAll) return currentTableData.value

    return originData.value.filter((item) => {
      return item.date.includes(searchVal)
    })
  })
  const onSearch = (type: 'input' | 'date') => {
    if (type === 'input') {
      tableData.value = filterData.value
    }
    if (type === 'date') {
      tableData.value = filterDataDate.value
    }
  }
  // 日期篩選
  const disabledDate = (time: any) => {
    return time.getTime() > Date.now()
  }

  const handleOrderInfo = (order: any) => {
    store.setOrder(order)
  }

  // lifecycle
  onMounted(async () => {
    await init()
    tableData.value = currentTableData.value
  })
</script>

<template>
  <v-card class="overflow-auto">
    <!-- 搜尋 -->
    <div class="mb-5 flex flex-wrap items-center gap-5">
      <el-input
        v-model="search"
        :placeholder="t('orders.searchPlaceholder')"
        class="w-full md:w-1/2"
        size="large"
        @keydown.enter="onSearch('input')"
      >
        <template #append>
          <el-button @click="onSearch('input')">
            <v-icon name="io-search" scale="1" class="pb-1" />
          </el-button>
        </template>
      </el-input>
      <el-date-picker
        v-model="date"
        type="date"
        :disabled-date="disabledDate"
        size="large"
        @change="onSearch('date')"
      />
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      ref="tableRef"
      :data="tableData"
      class="hidden w-full min-w-[720px] md:block"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <template #empty>
        <v-icon name="bi-inbox" scale="3" />
        <p>{{ t('emptyData') }}</p>
      </template>
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="column in columnProps"
        :key="column.prop"
        :property="column.prop"
        :sortable="column.sortable"
        :label="column.label"
        :width="column.width || 'auto'"
      >
        <template v-if="column.prop === 'orderNumber'" #default="scope">
          <RouterLink
            :to="`/orderManagement/${scope.row.orderNumber}`"
            class="text-nowrap text-blue-400"
            @click="handleOrderInfo(scope.row)"
          >
            {{ scope.row.orderNumber }}
          </RouterLink>
        </template>
        <template v-else-if="column.prop === 'orderName'" #default="scope">
          <div>{{ scope.row.orderName }}</div>
          <div class="text-sm text-slate-700/60">({{ scope.row.email }})</div>
        </template>
        <template v-else-if="column.prop === 'total'" #default="scope">
          {{ 'NT$ ' + thousandsSeparator(scope.row.total) }}
        </template>
      </el-table-column>
    </el-table>

    <div v-show="loading" v-loading="loading" class="min-h-40 md:hidden" />
    <!-- 手機版表格 -->
    <TransitionGroup name="list" tag="div">
      <template v-if="!loading">
        <v-card v-for="item in tableData" :key="item.orderNumber" class="mb-5 text-sm md:hidden">
          <div class="mb-2 border-b">
            <span>{{ t('orderNumber') }}：</span>
            <RouterLink
              :to="`/orderManagement/${item.orderNumber}`"
              class="text-blue-400"
              @click="handleOrderInfo(item)"
            >
              {{ item.orderNumber }}
            </RouterLink>
          </div>
          <div class="mb-2 border-b">
            <span>{{ item.date }}</span>
          </div>
          <div class="mb-2 border-b">
            <span>{{ item.orderName }} ({{ item.email }})</span>
          </div>
          <div>
            <span>{{ t('total') }}：</span>
            {{ 'NT$ ' + thousandsSeparator(item.total) }}
          </div>
        </v-card>
      </template>
    </TransitionGroup>

    <!-- 分頁 -->
    <div class="flex justify-center">
      <el-pagination
        v-model="currentPage"
        class="desktop-pagination mt-4"
        layout="prev, pager, next"
        :total="originData.length"
        :page-size="pageSize"
        :hide-on-single-page="true"
        @update:current-page="handlePageChange"
      />
      <el-pagination
        v-model="currentPage"
        class="mobile-pagination mt-4"
        layout="prev, pager, next"
        :total="originData.length"
        :page-size="pageSize"
        :hide-on-single-page="true"
        @update:current-page="handleMobilePageChange"
      />
    </div>
  </v-card>
</template>

<style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  .desktop-pagination {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .desktop-pagination {
      display: flex;
    }
    .mobile-pagination {
      display: none;
    }
  }
</style>
