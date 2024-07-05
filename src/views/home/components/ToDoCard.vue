<script lang="ts" setup>
  import { computed } from 'vue'
  import { t } from '@/locales/index'
  // 待辦事項
  const cardList = computed(() => {
    return [
      { title: t('overview.unRead') /** 留言未讀取 */, count: 20, icon: 'ri-message-2-line' },
      { title: t('overview.unShipped' /** 訂單未出貨 */), count: 1847, icon: 'hi-clipboard-list' },
      { title: t('overview.unpaid') /** 訂單未付款 */, count: 68, icon: 'bi-credit-card-2-back' },
    ]
  })
</script>

<template>
  <div class="flex items-center justify-center gap-4">
    <el-card
      v-for="(item, index) in cardList"
      :key="index"
      class="hover:cursor-pointer hover:shadow-lg hover:shadow-black/10"
    >
      <div class="flex h-full flex-col items-center justify-center gap-5">
        <v-icon :name="item.icon" scale="1.3" class="text-blue-400" />
        <div class="text-xl font-medium">{{ item.count }}</div>
        <div>{{ item.title }}</div>
      </div>
    </el-card>
  </div>
</template>
