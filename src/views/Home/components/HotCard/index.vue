<script lang="ts" setup>
  import { computed } from 'vue'
  import { t } from '@/locales/index'
  import type { Column } from '@/@types/components/table'

  const propColumns = computed<Column[]>(() => {
    return [
      {
        label: '',
        prop: 'img',
        width: '100',
      },
      {
        label: '',
        prop: 'title',
        width: '400',
      },
      {
        label: t('sales'),
        prop: 'count',
        type: 'currency',
        width: '200',
      },
      {
        label: t('viewCount'),
        prop: 'viewCount',
        width: '200',
      },
    ]
  })

  const hotList = computed(() => {
    return [
      {
        id: 1,
        img: 'https://cdn.pixabay.com/photo/2016/09/11/20/43/truck-butt-1662538_1280.jpg',
        title: t('hot.miniPiston'),
        count: 1000,
        viewCount: 20,
      },
      {
        id: 2,
        img: 'https://cdn.pixabay.com/photo/2020/09/15/08/17/tools-5572998_1280.jpg',
        title: t('hot.miniPiston'),
        count: 500,
        viewCount: 6,
      },
      {
        id: 3,
        img: 'https://cdn.pixabay.com/photo/2015/05/25/17/31/mini-cooper-783696_1280.jpg',
        title: t('hot.miniCooperClassic'),
        count: 400,
        viewCount: 10,
      },
      {
        id: 4,
        img: 'https://cdn.pixabay.com/photo/2017/07/19/00/02/british-racing-green-2517484_1280.jpg',
        title: t('hot.miniClassic'),
        count: 300,
        viewCount: 46,
      },
      {
        id: 5,
        img: 'https://cdn.pixabay.com/photo/2014/09/13/08/23/gear-443676_1280.jpg',
        title: t('hot.gearSet'),
        count: 200,
        viewCount: 58,
      },
    ]
  })
</script>

<template>
  <div class="transition-shadow duration-300 hover:shadow-lg hover:shadow-black/10">
    <v-card>
      <div class="mb-4 text-lg font-bold">{{ t('overview.hotProducts') }}</div>
      <v-table :data="hotList" :columns="propColumns" type="index">
        <template #index-column="{ index }">
          <span>No. {{ index + 1 }}</span>
        </template>
        <template #img-column="{ row }">
          <div class="h-10 w-10 overflow-hidden">
            <img class="h-full w-full object-cover" :src="row.img" alt="" />
          </div>
        </template>
      </v-table>
    </v-card>
  </div>
</template>
