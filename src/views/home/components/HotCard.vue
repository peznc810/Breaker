<script lang="ts" setup>
  import { computed } from 'vue'
  import { t } from '@/locales/index'

  const propColumns = computed(() => {
    return [
      {
        label: '',
        prop: 'img',
        width: '100',
      },
      {
        label: '',
        prop: 'title',
      },
      {
        label: '銷量',
        prop: 'count',
        type: 'currency',
      },
      {
        label: '商品瀏覽量',
        prop: 'viewCount',
      },
    ]
  })

  const hotList = computed(() => {
    return [
      {
        id: 1,
        img: 'https://cdn.pixabay.com/photo/2016/09/11/20/43/truck-butt-1662538_1280.jpg',
        title:
          '『限時回饋-下單現折50』Gale force s 迷你渦輪扇 ｜保固全面升級一年 渦輪小風扇 暴力風槍 暴力渦輪風',
        count: 1000,
        viewCount: 20,
      },
      {
        id: 2,
        img: 'https://cdn.pixabay.com/photo/2014/09/13/08/23/gear-443676_1280.jpg',
        title: '齒輪套裝組',
        count: 200,
        viewCount: 58,
      },
      {
        id: 3,
        img: 'https://cdn.pixabay.com/photo/2017/07/19/00/02/british-racing-green-2517484_1280.jpg',
        title: 'Austin Mini 經典款',
        count: 300,
        viewCount: 46,
      },
      {
        id: 4,
        img: 'https://cdn.pixabay.com/photo/2015/05/25/17/31/mini-cooper-783696_1280.jpg',
        title: 'Mini Cooper 經典款',
        count: 400,
        viewCount: 10,
      },
      {
        id: 5,
        img: 'https://cdn.pixabay.com/photo/2020/09/15/08/17/tools-5572998_1280.jpg',
        title: '多功能工具組',
        count: 500,
        viewCount: 6,
      },
    ]
  })
  // 由銷售高到低排序
  const descList = hotList.value.sort((a, b) => b.count - a.count)
</script>

<template>
  <div class="transition-shadow duration-300 hover:shadow-lg hover:shadow-black/10">
    <el-card>
      <div class="mb-4 text-lg font-bold">{{ t('overview.hotProducts') }}</div>
      <el-table :data="descList" :columns="propColumns" type="index">
        <template #index-column="{ index }">
          <span>No. {{ index + 1 }}</span>
        </template>
        <template #img-column="{ row }">
          <div class="h-10 w-10 overflow-hidden">
            <img class="h-full w-full object-cover" :src="row.img" alt="" />
          </div>
        </template>
      </el-table>
    </el-card>
  </div>
</template>
