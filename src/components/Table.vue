<script lang="ts" setup>
  import type { TableProps } from '@/@types/components/table'
  import { thousandsSeparator } from '@/utils/mixin'

  const props = defineProps<TableProps>()
</script>

<template>
  <div class="w-full overflow-x-auto" :class="props.class">
    <div class="w-full">
      <table class="v-table min-w-[600px]">
        <thead class="el-table__header">
          <tr>
            <!-- 第一列的樣式 -->
            <!-- 序號 -->
            <th v-if="props.type === 'index'" class="el-table__column--index w-20">
              <slot name="index-head" />
            </th>
            <!-- 多選框 -->
            <th v-else-if="props.type === 'checkbox'" class="el-table__column--checkbox w-20">
              <input type="checkbox" />
            </th>
            <!-- 第一列之後的樣式（可自定義） -->
            <slot name="table-head">
              <th
                v-for="column in props.columns"
                :key="column.prop"
                class="el-table__column--sortable text-nowrap"
                :style="column.width && `width: ${column.width}px`"
              >
                {{ column.label }}
              </th>
            </slot>
          </tr>
        </thead>
        <tbody class="el-table__body">
          <tr v-for="(row, index) in props.data" :key="row.id" class="el-table__row">
            <!-- 第一列的樣式(可自定義) -->
            <!-- 序號 -->
            <td v-if="props.type === 'index'" class="el-table__cell">
              <slot name="index-column" :row="row" :index="index">
                {{ index + 1 }}
              </slot>
            </td>
            <!-- 多選框 -->
            <td v-else-if="props.type === 'checkbox'" class="el-table__cell">
              <input type="checkbox" />
            </td>

            <!-- 第一列之後的樣式(可自定義) -->
            <td v-for="column in props.columns" :key="column.prop" class="el-table__cell">
              <!-- 例如： title-column -->
              <slot :name="`${column.prop}-column`" :row="row">
                <!-- 千分位 -->
                <template v-if="column.type === 'currency'">
                  {{ thousandsSeparator(row[column.prop]) }}
                </template>
                <!-- 預設 -->
                <template v-else>
                  {{ row[column.prop] }}
                </template>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
  .v-table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    font-size: 14px;
    color: #606266;
  }

  .el-table__header th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid #ebeef5;
  }

  .el-table__body {
    background-color: #fff;
  }

  .el-table__row {
    border-bottom: 1px solid #ebeef5;
  }

  .el-table__row:hover {
    background-color: #f5f7fa;
  }

  .el-table__cell {
    padding: 12px 8px;
    border-bottom: 1px solid #ebeef5;
  }

  .el-table__column--index {
    text-align: center;
  }
</style>
